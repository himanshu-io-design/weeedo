import React, { useState } from 'react';

interface CreateAWorkspaceProps {
  onGoBack: () => void;
  onCreateWorkspace: (userName: string, workspaceName: string) => void;
  onLogoClick: () => void;
}

export default function CreateAWorkspace({ onGoBack, onCreateWorkspace, onLogoClick }: CreateAWorkspaceProps) {
  const [userName, setUserName] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');

  const handleSubmit = () => {
    if (userName.trim() && workspaceName.trim()) {
      onCreateWorkspace(userName.trim(), workspaceName.trim());
    }
  };

  return (
    <div className="bg-[#e9e6df] relative size-full flex items-center justify-center" data-name="Create a workspce">
      <div className="content-stretch flex flex-col gap-[88px] items-center justify-center">
        {/* Header */}
        <div className="content-stretch flex flex-col gap-[16px] items-center w-[568px]">
          <p className="font-['Inter_Display:Medium',sans-serif] relative shrink-0 text-[40px] text-stone-800 tracking-[-0.8px] w-full cursor-pointer text-center" onClick={onLogoClick}>
            <span>{`welcome to `}</span>
            <span className="font-['Inter_Display:SemiBold_Italic',sans-serif] italic">We</span>
            <span className="font-['Inter_Display:SemiBold',sans-serif] not-italic">Do.</span>
          </p>
          <p className="font-['Inter_Display:Regular',sans-serif] relative shrink-0 text-[24px] text-stone-400 tracking-[-0.8px] w-full text-center">a simple collaborative todo list workspace for your team.</p>
        </div>
        
        {/* Form */}
        <div className="content-stretch flex flex-col gap-[24px] items-center w-[264px]">
          <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              <p className="font-['Inter_Display:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-center text-stone-500 tracking-[-0.18px] w-full">what do other humans call you?</p>
              <div className="bg-stone-50 relative rounded-[8px] shrink-0 w-full" data-name="Input">
                <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] w-full">
                  <input
                    type="text"
                    placeholder="enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="basis-0 font-['Inter_Display:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[15px] text-stone-800 placeholder:text-stone-400 bg-transparent border-0 outline-none px-[16px] py-[14px] w-full"
                  />
                </div>
                <div aria-hidden="true" className={`absolute border border-solid ${userName.trim() ? 'border-stone-800' : 'border-stone-400'} inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors`} />
              </div>
            </div>
            
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              <p className="font-['Inter_Display:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-center text-stone-500 tracking-[-0.18px] w-full">now, let's give your workspace a cool name</p>
              <div className="bg-stone-50 relative rounded-[8px] shrink-0 w-full" data-name="Input">
                <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] w-full">
                  <input
                    type="text"
                    placeholder="workspace name"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    className="basis-0 font-['Inter_Display:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[15px] text-stone-800 placeholder:text-stone-400 bg-transparent border-0 outline-none px-[16px] py-[14px] w-full"
                  />
                </div>
                <div aria-hidden="true" className={`absolute border border-solid ${workspaceName.trim() ? 'border-stone-800' : 'border-stone-400'} inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors`} />
              </div>
            </div>
          </div>
          
          <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Button">
            <div className="basis-0 bg-stone-500 hover:bg-stone-600 active:bg-stone-700 transition-colors grow min-h-px min-w-px relative rounded-[8px] shrink-0 cursor-pointer" data-name="_button" onClick={handleSubmit}>
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[14px] relative w-full">
                  <p className="font-['Inter_Display:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[15px] text-center text-nowrap text-stone-50 whitespace-pre">create a workspace</p>
                </div>
              </div>
            </div>
          </div>
          
          <p
            className="[text-underline-position:from-font] decoration-solid font-['Inter_Display:Regular',sans-serif] leading-[normal] not-italic text-[14px] text-center text-stone-500 hover:text-stone-600 active:text-stone-700 transition-colors tracking-[-0.14px] underline cursor-pointer"
            onClick={onGoBack}
          >
            go back
          </p>
        </div>
      </div>
    </div>
  );
}