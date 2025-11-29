import React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableTodoItem } from './DraggableTodoItem';
import { supabase } from '../config/supabase';
import svgPaths from '../imports/svg-2h6h5d4xfl';
import Animated from './Animated';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdBy: string;
}

interface Message {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
}

interface DashboardProps {
  workspaceName: string;
  workspaceId: string;
  workspaceDbId: string;
  displayName: string;
  onLogoClick: () => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

function Copy() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="copy">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_36518)" id="copy">
          <path d={svgPaths.p216f800} id="Vector" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p13e4b3c0} id="Vector_2" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4_36518">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CornerDownLeft() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="corner-down-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="corner-down-left">
          <path d={svgPaths.p174e7400} id="Vector" stroke="var(--stroke-0, #A8A29E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2331d880} id="Vector_2" stroke="var(--stroke-0, #A8A29E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function GripHorizontal() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="grip-horizontal">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="grip-horizontal">
          <path d={svgPaths.p2307c172} fill="var(--fill-0, #57534E)" id="Vector" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p35f3d000} fill="var(--fill-0, #57534E)" id="Vector_2" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1735ba00} fill="var(--fill-0, #57534E)" id="Vector_3" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1e384980} fill="var(--fill-0, #57534E)" id="Vector_4" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p35447980} fill="var(--fill-0, #57534E)" id="Vector_5" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3fa3fd00} fill="var(--fill-0, #57534E)" id="Vector_6" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Trash() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="trash-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="trash-2">
          <path d="M2.5 5H17.5" id="Vector" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p26c6b600} id="Vector_2" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p276bd300} id="Vector_3" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.33333 9.16667V14.1667" id="Vector_4" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.6667 9.16667V14.1667" id="Vector_5" stroke="var(--stroke-0, #57534E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Send() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="send">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_36478)" id="send">
          <path d={svgPaths.p30547200} id="Vector" stroke="var(--stroke-0, #A8A29E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d327c00} id="Vector_2" stroke="var(--stroke-0, #A8A29E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_4_36478">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Check() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="check">
          <path d="M10 3L4.5 8.5L2 6" id="Vector" stroke="var(--stroke-0, #A8A29E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

export default function Dashboard({ 
  workspaceName, 
  workspaceId,
  workspaceDbId,
  displayName,
  onLogoClick
}: DashboardProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [newMessageText, setNewMessageText] = useState('');
  const [showCopied, setShowCopied] = useState(false);
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Load initial todos and messages from Supabase
  useEffect(() => {
    const loadInitialData = async () => {
      // Load todos
      const { data: todosData, error: todosError } = await supabase
        .from('todos')
        .select('*')
        .eq('workspace_id', workspaceDbId)
        .order('created_at', { ascending: true });

      if (!todosError && todosData) {
        setTodos(todosData.map(todo => ({
          id: todo.id,
          text: todo.text,
          completed: todo.done,
          createdBy: todo.created_by
        })));
      }

      // Load messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('workspace_id', workspaceDbId)
        .order('created_at', { ascending: true });

      if (!messagesError && messagesData) {
        setMessages(messagesData.map(msg => ({
          id: msg.id,
          author: msg.author,
          text: msg.text,
          timestamp: new Date(msg.created_at)
        })));
      }
    };

    loadInitialData();
  }, [workspaceDbId]);

  // Set up realtime subscriptions for todos
  useEffect(() => {
    const todosChannel = supabase
      .channel(`todos:${workspaceDbId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'todos',
          filter: `workspace_id=eq.${workspaceDbId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newTodo = payload.new as any;
            setTodos(prev => [...prev, {
              id: newTodo.id,
              text: newTodo.text,
              completed: newTodo.done,
              createdBy: newTodo.created_by
            }]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedTodo = payload.new as any;
            setTodos(prev => prev.map(todo => 
              todo.id === updatedTodo.id 
                ? {
                    id: updatedTodo.id,
                    text: updatedTodo.text,
                    completed: updatedTodo.done,
                    createdBy: updatedTodo.created_by
                  }
                : todo
            ));
          } else if (payload.eventType === 'DELETE') {
            const deletedTodo = payload.old as any;
            setTodos(prev => prev.filter(todo => todo.id !== deletedTodo.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(todosChannel);
    };
  }, [workspaceDbId]);

  // Set up realtime subscriptions for messages
  useEffect(() => {
    const messagesChannel = supabase
      .channel(`messages:${workspaceDbId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `workspace_id=eq.${workspaceDbId}`
        },
        (payload) => {
          const newMessage = payload.new as any;
          setMessages(prev => [...prev, {
            id: newMessage.id,
            author: newMessage.author,
            text: newMessage.text,
            timestamp: new Date(newMessage.created_at)
          }]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
    };
  }, [workspaceDbId]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleCopyWorkspaceId = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(workspaceId);
      } else {
        // Fallback method for environments where clipboard API is blocked
        const textArea = document.createElement('textarea');
        textArea.value = workspaceId;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 1200);
    } catch (err) {
      // Fallback for any errors
      const textArea = document.createElement('textarea');
      textArea.value = workspaceId;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 1200);
      } catch (fallbackErr) {
        console.error('Failed to copy:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleCopyInviteLink = async () => {
    const inviteLink = `${window.location.origin}${window.location.pathname}?join=${workspaceId}`;
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(inviteLink);
      } else {
        // Fallback method
        const textArea = document.createElement('textarea');
        textArea.value = inviteLink;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setShowLinkCopied(true);
      setTimeout(() => setShowLinkCopied(false), 1200);
    } catch (err) {
      // Fallback for any errors
      const textArea = document.createElement('textarea');
      textArea.value = inviteLink;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setShowLinkCopied(true);
        setTimeout(() => setShowLinkCopied(false), 1200);
      } catch (fallbackErr) {
        console.error('Failed to copy invite link:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleAddTodo = async () => {
    if (newTodoText.trim()) {
      const { error } = await supabase
        .from('todos')
        .insert({
          workspace_id: workspaceDbId,
          text: newTodoText.trim(),
          created_by: displayName,
          done: false
        });

      if (error) {
        console.error('Error adding todo:', error);
        alert('Failed to add todo. Please try again.');
      } else {
        setNewTodoText('');
      }
    }
  };

  const handleToggleTodo = useCallback(async (id: string) => {
    // Find the current todo
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    // Optimistic update - update local state immediately
    setTodos(prevTodos => 
      prevTodos.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

    // Then update the database
    const { error } = await supabase
      .from('todos')
      .update({ done: !todo.completed })
      .eq('id', id);

    if (error) {
      console.error('Error toggling todo:', error);
      // Revert the optimistic update on error
      setTodos(prevTodos => 
        prevTodos.map(t => 
          t.id === id ? { ...t, completed: todo.completed } : t
        )
      );
      alert('Failed to update todo. Please try again.');
    }
  }, [todos]);

  const handleDeleteTodo = useCallback(async (id: string) => {
    // Store the todo in case we need to restore it
    const todoToDelete = todos.find(t => t.id === id);
    
    // Optimistic update - remove from local state immediately
    setTodos(prevTodos => prevTodos.filter(t => t.id !== id));

    // Then delete from database
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting todo:', error);
      // Restore the todo on error
      if (todoToDelete) {
        setTodos(prevTodos => [...prevTodos, todoToDelete]);
      }
      alert('Failed to delete todo. Please try again.');
    }
  }, [todos]);

  const moveTodo = useCallback((dragIndex: number, hoverIndex: number) => {
    // Note: Drag and drop reordering is a UI-only feature
    // We're not persisting the order to the database for simplicity
    const newTodos = [...todos];
    const dragTodo = newTodos[dragIndex];
    newTodos.splice(dragIndex, 1);
    newTodos.splice(hoverIndex, 0, dragTodo);
    setTodos(newTodos);
  }, [todos]);

  const handleSendMessage = async () => {
    if (newMessageText.trim()) {
      const { error } = await supabase
        .from('messages')
        .insert({
          workspace_id: workspaceDbId,
          author: displayName,
          text: newMessageText.trim()
        });

      if (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      } else {
        setNewMessageText('');
      }
    }
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <div className="bg-[#e9e6df] relative size-full flex flex-col" data-name="workspace">
      {/* Header */}
      <div className="w-full flex justify-center pt-[48px] pb-[24px]">
        <div className="flex w-[1040px] gap-x-[260px] items-center">
          {/* Left side */}
          <div className="flex gap-[16px] items-center">
            <p
              className="font-['Inter_Display:Medium',sans-serif] leading-[normal] not-italic text-[24px] text-nowrap text-stone-800 tracking-[-0.48px] whitespace-pre cursor-pointer"
              onClick={onLogoClick}
            >
              <span className="font-['Inter_Display:SemiBold_Italic',sans-serif] italic">We</span>
              <span className="font-['Inter_Display:SemiBold',sans-serif]">Do.</span>
            </p>

            <div
              className="flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]"
              style={{ "--transform-inner-width": "24", "--transform-inner-height": "0" } as React.CSSProperties}
            >
              <div className="flex-none rotate-[90deg]">
                <div className="h-0 relative w-[24px]">
                  <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 1">
                      <line id="Line 1" stroke="var(--stroke-0, #A8A29E)" x2="24" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <p className="font-['Inter_Display:Regular',sans-serif] leading-[normal] not-italic text-[16px] text-nowrap text-stone-400 tracking-[-0.16px] whitespace-pre">
              a simple collaborative todo list workspace for your team.
            </p>
          </div>

          {/* Right side */}
          <p
            className="[text-underline-position:from-font] decoration-solid font-['Inter_Display:Regular',sans-serif] leading-[normal] not-italic text-[14px] text-center text-nowrap text-stone-500 tracking-[-0.14px] underline whitespace-pre cursor-pointer hover:text-stone-600 active:text-stone-700 transition-colors"
            onClick={onLogoClick}
          >
            create a workspace
          </p>
        </div>
      </div>


      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="content-stretch flex flex-col gap-[40px] items-center w-full">
          <div className="content-stretch flex flex-col gap-[24px] items-center w-full">
            <Animated className="content-stretch flex flex-col gap-[16px] items-center w-full">
              <p className="font-['Inter_Display:Medium',sans-serif] leading-[normal] min-w-full not-italic shrink-0 text-[40px] text-center text-stone-600 tracking-[-0.8px] w-[min-content]">
                {workspaceName}
              </p>
              <div className="content-stretch flex gap-[8px] items-center justify-center shrink-0 flex-wrap">
                <p className="font-['Inter_Display:Medium',sans-serif] leading-[24px] not-italic shrink-0 text-[16px] text-nowrap text-stone-500 tracking-[-0.16px] whitespace-pre">
                  copy the
                </p>
                <div
                  className="relative cursor-pointer"
                  onClick={handleCopyInviteLink}
                  title="Copy invite link"
                >
                  <p className="font-['Inter_Display:Medium',sans-serif] leading-[24px] not-italic shrink-0 text-[16px] text-nowrap text-stone-500 hover:text-stone-600 active:text-stone-700 transition-colors tracking-[-0.16px] whitespace-pre underline">
                    invite link
                  </p>
                  {showLinkCopied && (
                    <div className="absolute left-0 top-[-28px] bg-stone-800 text-stone-50 px-[8px] py-[4px] rounded-[4px] text-[12px] font-['Inter_Display:Medium',sans-serif] whitespace-nowrap">
                      link copied
                    </div>
                  )}
                </div>
                <p className="font-['Inter_Display:Medium',sans-serif] leading-[24px] not-italic shrink-0 text-[16px] text-nowrap text-stone-500 tracking-[-0.16px] whitespace-pre">or share this code with your team: </p>
                <div className="content-stretch flex gap-[8px] items-center shrink-0">
                  <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Inter_Display:Medium',sans-serif] leading-[24px] not-italic shrink-0 text-[16px] text-nowrap text-stone-600 whitespace-pre">{workspaceId}</p>
                  <div className="relative cursor-pointer" onClick={handleCopyWorkspaceId}>
                    <Copy />
                    {showCopied && (
                      <div className="absolute left-[20px] top-[-4px] bg-stone-800 text-stone-50 px-[8px] py-[4px] rounded-[4px] text-[12px] font-['Inter_Display:Medium',sans-serif] whitespace-nowrap">
                        copied
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Animated>
            <Animated delay={30} className="w-full">
              <p className="font-['Inter_Display:Regular',sans-serif] leading-[normal] not-italic shrink-0 text-[24px] text-center text-nowrap text-stone-400 tracking-[-0.24px] whitespace-pre">alright folks! let's get back to work</p>
            </Animated>
          </div>

          {/* Panels Container */}
          <div className="flex gap-[16px] items-start justify-center">
            {/* Left Panel - Todos */}
            <Animated delay={100} className="bg-stone-50 box-border content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[24px] rounded-[20px] shrink-0 size-[512px]">
              {/* Fixed Header and Input */}
              <div className="box-border content-stretch flex flex-col gap-[24px] items-start pb-[16px] pt-0 px-0 relative shrink-0 w-full">
                <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid border-stone-200 inset-0 pointer-events-none" />
                <p className="font-['Inter_Display:Medium',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[20px] text-stone-400 tracking-[-0.2px] w-[min-content]">{`let’s pretend we’re productive... `}</p>
                
                {/* Add Todo Input */}
                <div className="box-border content-stretch flex gap-[12px] items-center relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[464px] group/input" data-name="Checkbox">
                  <div className="basis-0 grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="_checkbox">
                    <div aria-hidden="true" className={`absolute border border-solid ${newTodoText.trim() ? 'border-stone-800' : 'border-stone-400 group-hover/input:border-stone-500'} inset-0 pointer-events-none rounded-[8px] transition-colors`} />
                    <div className="flex flex-row items-center size-full">
                      <div className="box-border content-stretch flex gap-[8px] items-center pl-[16px] pr-[8px] py-[8px] relative w-full">
                        <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="List">
                          <input
                            type="text"
                            placeholder="add a new task"
                            value={newTodoText}
                            onChange={(e) => setNewTodoText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
                            className="font-['Inter_Display:Regular',sans-serif] leading-[24px] not-italic text-[16px] text-stone-800 placeholder:text-stone-400 bg-transparent border-0 outline-none w-full"
                          />
                        </div>
                        <div 
                          className={`${newTodoText.trim() ? 'bg-stone-600 hover:bg-stone-700' : 'bg-stone-200 hover:bg-stone-300'} active:bg-stone-800 transition-colors box-border content-stretch flex gap-[4px] items-center px-[8px] py-[5px] relative rounded-[4px] shrink-0 cursor-pointer`}
                          onClick={handleAddTodo}
                        >
                          <p className={`font-['Inter_Display:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap whitespace-pre ${newTodoText.trim() ? 'text-stone-50' : 'text-stone-400'}`}>add</p>
                          <CornerDownLeft />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Todo List */}
              <div className="relative w-full flex-1 overflow-hidden">
                <div className="content-stretch flex flex-col gap-[12px] items-start w-full h-full overflow-y-auto pr-[12px] custom-scrollbar">
                  {todos.map((todo, index) => (
                    <DraggableTodoItem 
                      key={todo.id}
                      todo={todo}
                      index={index}
                      onToggle={() => handleToggleTodo(todo.id)}
                      onDelete={() => handleDeleteTodo(todo.id)}
                      onMove={moveTodo} 
                    />
                  ))}
                </div>
              </div>
            </Animated>

            {/* Right Panel - Chat */}
            <Animated delay={100} className="bg-stone-50 box-border content-stretch flex flex-col items-start justify-between overflow-clip p-[24px] rounded-[20px] shrink-0 size-[512px]">
              <div className="bg-stone-50 box-border content-stretch flex gap-[8px] items-center justify-center pb-[16px] pt-0 px-0 relative shrink-0 w-full">
                <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid border-stone-200 inset-0 pointer-events-none" />
                <p className="basis-0 font-['Inter_Display:Medium',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[20px] text-stone-400 tracking-[-0.2px]">yap here all day...</p>
              </div>

              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full flex-1 overflow-hidden">
                {/* Messages */}
                <div className="relative w-full flex-1 overflow-hidden">
                  <div ref={chatScrollRef} className="content-stretch flex flex-col gap-[12px] items-start w-full h-full overflow-y-auto pr-[12px] custom-scrollbar pt-[12px]">
                    {messages.map((message) => {
                      const isOwnMessage = message.author === displayName;
                      return (
                        <div key={message.id} className="relative shrink-0 w-full" data-name="Chat Bubble">
                          <div className={`size-full ${isOwnMessage ? 'flex flex-col items-end' : ''}`}>
                            <div className={`box-border content-stretch flex flex-col gap-[4px] ${isOwnMessage ? 'items-end pl-[80px] pr-0' : 'items-start pl-0 pr-[80px]'} py-0 relative w-full`}>
                              <div className={`${isOwnMessage ? 'bg-stone-200' : 'bg-stone-100'} ${isOwnMessage ? 'box-border content-stretch flex flex-col gap-[4px] items-start px-[16px] py-[12px] relative rounded-[16px] shrink-0' : 'relative rounded-[16px] shrink-0 w-full'}`} data-name="Card">
                                <div className={isOwnMessage ? '' : 'size-full'}>
                                  <div className={`box-border content-stretch flex flex-col gap-[4px] items-start ${isOwnMessage ? '' : 'px-[16px] py-[12px] relative w-full'}`}>
                                    <div className={`content-stretch flex gap-[4px] items-center ${isOwnMessage ? 'justify-end' : ''} relative shrink-0 w-full`} data-name="Footer">
                                      <p className="font-['Inter_Display:SemiBold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[14px] text-nowrap text-stone-400 whitespace-pre">{message.author}</p>
                                    </div>
                                    <p className={`font-['Inter_Display:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-stone-800 ${isOwnMessage ? 'text-nowrap whitespace-pre' : 'w-full'}`}>
                                      {message.text}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={`content-stretch flex gap-[4px] items-center ${isOwnMessage ? 'justify-end' : ''} relative shrink-0 w-full`} data-name="Footer">
                                <Check />
                                <p className="font-['Inter_Display:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[10px] text-nowrap text-stone-400 whitespace-pre">{formatTime(message.timestamp)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Message Input */}
                <div className="box-border content-stretch flex gap-[12px] h-[46px] items-center relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-[464px] group/input" data-name="Checkbox">
                  <div className="basis-0 grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="_checkbox">
                    <div aria-hidden="true" className={`absolute border border-solid ${newMessageText.trim() ? 'border-stone-800' : 'border-stone-400 group-hover/input:border-stone-500'} inset-0 pointer-events-none rounded-[8px] transition-colors`} />
                    <div className="flex flex-row items-center size-full">
                      <div className="box-border content-stretch flex gap-[8px] items-center pl-[16px] pr-[8px] py-[8px] relative w-full">
                        <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="List">
                          <input
                            type="text"
                            placeholder="write a message"
                            value={newMessageText}
                            onChange={(e) => setNewMessageText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="font-['Inter_Display:Regular',sans-serif] leading-[24px] not-italic text-[16px] text-stone-800 placeholder:text-stone-400 bg-transparent border-0 outline-none w-full"
                          />
                        </div>
                        <div 
                          className={`${newMessageText.trim() ? 'bg-stone-600 hover:bg-stone-700' : 'bg-stone-200 hover:bg-stone-300'} active:bg-stone-800 transition-colors box-border content-stretch flex gap-[4px] items-center px-[8px] py-[5px] relative rounded-[4px] shrink-0 cursor-pointer`}
                          onClick={handleSendMessage}
                        >
                          <p className={`font-['Inter_Display:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap whitespace-pre ${newMessageText.trim() ? 'text-stone-50' : 'text-stone-400'}`}>Send</p>
                          <Send />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Animated>
          </div>
        </div>
      </div>
    </div>
    </DndProvider>
  );
}