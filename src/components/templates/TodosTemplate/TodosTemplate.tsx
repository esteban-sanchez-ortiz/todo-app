import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Typography } from '@components/atoms';
import { TodoInputBar, FloatingBubble, DoneZone } from '@components/molecules';
import { TodoItem } from './TodosTemplate.types';

export const TodosTemplate = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: 1,
      desc: 'Learn React',
      date: Date.now(),
      completed: false,
      position: { x: 100, y: 120 },
      zIndex: 1,
      colorIndex: 0,
    },
    {
      id: 2,
      desc: 'Build an awesome todo app',
      date: Date.now(),
      completed: false,
      position: { x: 350, y: 180 },
      zIndex: 2,
      colorIndex: 1,
    },
    {
      id: 3,
      desc: 'Master drag and drop',
      date: Date.now(),
      completed: false,
      position: { x: 600, y: 140 },
      zIndex: 3,
      colorIndex: 2,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [maxZIndex, setMaxZIndex] = useState(3);
  const [nextColorIndex, setNextColorIndex] = useState(3);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  // Auto-delete completed tasks after 15 seconds
  useEffect(() => {
    const completedTodos = todos.filter((t) => t.completed);

    completedTodos.forEach((todo) => {
      const timer = setTimeout(() => {
        setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
      }, 15000);

      return () => clearTimeout(timer);
    });
  }, [todos]);

  const handleAddTodo = useCallback(() => {
    if (inputValue.trim()) {
      setTodos((prevTodos) => {
        const activeTodosCount = prevTodos.filter((t) => !t.completed).length;

        // Limit to 20 active tasks
        if (activeTodosCount >= 20) {
          return prevTodos;
        }

        const newZIndex = maxZIndex + 1;
        const stickyNoteWidth = 200;
        const stickyNoteHeight = 200;
        const margin = 20;

        // Calculate safe boundaries
        const maxX = Math.max(
          window.innerWidth - stickyNoteWidth - margin,
          margin,
        );
        const maxY = Math.max(
          window.innerHeight - stickyNoteHeight - margin - 200,
          100,
        );

        // Cycle through 6 colors (0-5)
        const colorIndex = nextColorIndex % 6;

        const newTodo: TodoItem = {
          id: Date.now(),
          desc: inputValue,
          date: Date.now(),
          completed: false,
          position: {
            x: Math.random() * (maxX - margin) + margin,
            y: Math.random() * (maxY - 100) + 100,
          },
          zIndex: newZIndex,
          colorIndex,
        };

        setMaxZIndex(newZIndex);
        setNextColorIndex((prev) => prev + 1);
        setInputValue('');
        return [...prevTodos, newTodo];
      });
    }
  }, [inputValue, maxZIndex, nextColorIndex]);

  const handleDeleteTodo = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const handleEditTodo = useCallback((id: number, newDesc: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === id ? { ...t, desc: newDesc } : t))
    );
  }, []);

  const handleToggleTodo = useCallback((id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const handleBringToFront = useCallback((id: number) => {
    setMaxZIndex((prevMaxZ) => {
      const newZIndex = prevMaxZ + 1;
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === id ? { ...t, zIndex: newZIndex } : t))
      );
      return newZIndex;
    });
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over, delta } = event;

    if (over && over.id === 'done-zone') {
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === Number(active.id)
            ? { ...t, completed: true, completedAt: Date.now() }
            : t
        )
      );
    } else {
      // Update position when dragging around with constraints
      const stickyNoteWidth = 200;
      const stickyNoteHeight = 200;
      const margin = 20;

      setTodos((prevTodos) =>
        prevTodos.map((t) => {
          if (t.id === Number(active.id)) {
            const newX = (t.position?.x ?? 0) + delta.x;
            const newY = (t.position?.y ?? 0) + delta.y;

            // Constrain within viewport
            const constrainedX = Math.max(
              margin,
              Math.min(newX, window.innerWidth - stickyNoteWidth - margin)
            );
            const constrainedY = Math.max(
              margin,
              Math.min(newY, window.innerHeight - stickyNoteHeight - margin)
            );

            return {
              ...t,
              position: {
                x: constrainedX,
                y: constrainedY,
              },
            };
          }
          return t;
        })
      );
    }
  }, []);

  const activeTodos = useMemo(() => todos.filter((t) => !t.completed), [todos]);
  const completedTodos = useMemo(() => todos.filter((t) => t.completed), [todos]);
  const isLimitReached = useMemo(() => activeTodos.length >= 20, [activeTodos.length]);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="min-h-screen desktop-bg">
        {/* Top Bar */}
        <div className="desktop-topbar">
          <Typography
            variant="h2"
            className="transform -rotate-1 text-[#654321]"
          >
            ✨ Todo Desktop ✨
          </Typography>
          <Typography variant="caption" className="text-[#8b6f47]">
            {activeTodos.length} active · {completedTodos.length} done
          </Typography>
        </div>

        {/* Desktop workspace */}
        <div className="desktop-workspace">
          {/* Input Area - Fixed at top */}
          <div className="input-area">
            <div
              className="paper-texture p-4 rounded relative"
              style={{
                border: '1px solid #333',
                boxShadow:
                  '1px 1px 0 rgba(51,51,51,0.4), -0.5px 1px 0 rgba(51,51,51,0.2), 1px -0.5px 0 rgba(51,51,51,0.2)',
              }}
            >
              {isLimitReached && (
                <div
                  className="mb-3 p-3 rounded"
                  style={{
                    background:
                      'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)',
                    border: '2px solid #dc2626',
                    boxShadow: '2px 2px 0 rgba(220, 38, 38, 0.3)',
                  }}
                >
                  <Typography
                    variant="body"
                    className="text-[#991b1b] font-bold"
                  >
                    ⚠️ Maximum limit reached!
                  </Typography>
                  <Typography
                    variant="caption"
                    className="text-[#7f1d1d] block mt-1"
                  >
                    You have 20 active tasks. Complete some before adding more.
                  </Typography>
                </div>
              )}
              <TodoInputBar
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onAdd={handleAddTodo}
                placeholder={
                  isLimitReached
                    ? 'Complete some tasks first...'
                    : 'Add a new floating todo... ✍️'
                }
                disabled={isLimitReached}
              />
            </div>
          </div>

          {/* Main area with floating bubbles */}
          <div className="floating-area">
            {activeTodos.map((todo) => (
              <FloatingBubble
                key={todo.id}
                id={todo.id}
                desc={todo.desc}
                date={todo.date}
                completed={todo.completed}
                position={todo.position}
                zIndex={todo.zIndex}
                colorIndex={todo.colorIndex ?? 0}
                completedAt={todo.completedAt}
                onDelete={() => handleDeleteTodo(todo.id)}
                onEdit={(newDesc) => handleEditTodo(todo.id, newDesc)}
                onBringToFront={() => handleBringToFront(todo.id)}
              />
            ))}

            {activeTodos.length === 0 && (
              <div className="empty-desktop">
                <Typography variant="h3" className="text-gray-400">
                  No floating todos! 🎈
                </Typography>
                <Typography variant="caption" className="text-gray-400 mt-2">
                  Add one above to see it float around
                </Typography>
              </div>
            )}
          </div>

          {/* Done Zone - Fixed at bottom right */}
          <div className="done-zone-container">
            <DoneZone completedTodos={completedTodos} />
          </div>
        </div>
      </div>
    </DndContext>
  );
};
