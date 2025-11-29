import React from 'react';
import { useState, useEffect } from 'react';
import LandingScreen from './components/LandingScreen';
import CreateAWorkspace from './components/CreateAWorkspace';
import JoinAWorkspace from './components/JoinAWorkspace';
import Dashboard from './components/Dashboard';
import { supabase } from './config/supabase';

type Screen = 'landing' | 'create' | 'join' | 'dashboard';

interface Workspace {
  id: string;
  name: string;
  code: string;
}

// Generate random workspace code
const generateWorkspaceCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toLowerCase();
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [inviteCode, setInviteCode] = useState<string>('');

  // Load display name from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem('wedo_display_name');
    if (savedName) {
      setDisplayName(savedName);
    }
  }, []);

  // Check for invite link query parameter on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const joinCode = urlParams.get('join');
    if (joinCode) {
      // Navigate to join screen with pre-filled code
      setCurrentScreen('join');
      // Store the code to pass to JoinAWorkspace component
      setInviteCode(joinCode);
    }
  }, []);

  const handleCreateWorkspace = async (userName: string, workspaceName: string) => {
    try {
      // Generate a unique workspace code
      let workspaceCode = generateWorkspaceCode();
      let codeExists = true;
      
      // Ensure the code is unique (retry if it exists)
      while (codeExists) {
        const { data: existing } = await supabase
          .from('workspaces')
          .select('code')
          .eq('code', workspaceCode)
          .single();
        
        if (!existing) {
          codeExists = false;
        } else {
          workspaceCode = generateWorkspaceCode();
        }
      }

      // Create workspace in Supabase
      const { data: workspace, error } = await supabase
        .from('workspaces')
        .insert({
          code: workspaceCode,
          name: workspaceName
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating workspace:', error);
        alert('Failed to create workspace. Please try again.');
        return;
      }

      // Save display name to localStorage and state
      localStorage.setItem('wedo_display_name', userName);
      setDisplayName(userName);
      
      // Set current workspace and navigate to dashboard
      setCurrentWorkspace({
        id: workspace.id,
        name: workspace.name,
        code: workspace.code
      });
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Error creating workspace:', error);
      alert('Failed to create workspace. Please check your Supabase configuration.');
    }
  };

  const handleJoinWorkspace = async (workspaceCode: string, userName: string) => {
    try {
      // Normalize the code: trim and lowercase
      const normalizedCode = workspaceCode.toLowerCase().trim();
      
      // Check if workspace exists in Supabase
      const { data: workspace, error } = await supabase
        .from('workspaces')
        .select('id, name, code')
        .eq('code', normalizedCode)
        .single();

      if (error || !workspace) {
        alert(`Workspace "${normalizedCode}" not found! Please check the code and try again.`);
        return;
      }

      // Save display name to localStorage and state
      localStorage.setItem('wedo_display_name', userName);
      setDisplayName(userName);
      
      // Set current workspace and navigate to dashboard
      setCurrentWorkspace({
        id: workspace.id,
        name: workspace.name,
        code: workspace.code
      });
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Error joining workspace:', error);
      alert('Failed to join workspace. Please check your Supabase configuration.');
    }
  };

  const handleGoToLanding = () => {
    setCurrentScreen('landing');
    setCurrentWorkspace(null);
  };

  return (
    <>
      {/* Shadow texture overlay */}
      {/* Texture location: public/textures/shadow.png */}
      {/* To adjust: modify opacity (0.25-0.40) and mixBlendMode (multiply/overlay) in the style prop */}
      <div
        className="shadow-texture-overlay"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/textures/shadow.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'normal',
          opacity: 0.15,
          zIndex: 40,
          pointerEvents: 'none',
        }}
      />
      
      {/* Main app content */}
      <div className="h-screen w-screen">
        {currentScreen === 'landing' && (
          <LandingScreen
            onCreateWorkspace={() => setCurrentScreen('create')}
            onJoinWorkspace={() => setCurrentScreen('join')}
          />
        )}
        {currentScreen === 'create' && (
          <CreateAWorkspace 
            onGoBack={() => setCurrentScreen('landing')}
            onCreateWorkspace={handleCreateWorkspace}
            onLogoClick={handleGoToLanding}
          />
        )}
        {currentScreen === 'join' && (
          <JoinAWorkspace 
            onGoBack={() => {
              setCurrentScreen('landing');
              setInviteCode('');
              // Clear the query parameter from URL
              window.history.replaceState({}, '', window.location.pathname);
            }}
            onJoinWorkspace={handleJoinWorkspace}
            onLogoClick={handleGoToLanding}
            initialCode={inviteCode}
          />
        )}
        {currentScreen === 'dashboard' && currentWorkspace && (
          <Dashboard
            workspaceName={currentWorkspace.name}
            workspaceId={currentWorkspace.code}
            workspaceDbId={currentWorkspace.id}
            displayName={displayName}
            onLogoClick={handleGoToLanding}
          />
        )}
      </div>
    </>
  );
}