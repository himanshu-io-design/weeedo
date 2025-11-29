import React from 'react';
import Animated from './Animated';

interface LandingScreenProps {
  onCreateWorkspace: () => void;
  onJoinWorkspace: () => void;
}

export default function LandingScreen({ onCreateWorkspace, onJoinWorkspace }: LandingScreenProps) {
  return (
    <div className="bg-[#e9e6df] relative size-full flex items-center justify-center" data-name="Landing Screen">
      <div className="content-stretch flex flex-col gap-[88px] items-center justify-center">
        <Animated className="content-stretch flex flex-col gap-[8px] items-center w-[568px]">
          <p className="font-['Inter_Display:Medium',sans-serif] relative shrink-0 text-[40px] text-stone-800 tracking-[-0.8px] w-full text-center">
            <span>{`welcome to `}</span>
            <span className="font-['Inter_Display:SemiBold_Italic',sans-serif] italic">We</span>
            <span className="font-['Inter_Display:SemiBold',sans-serif] not-italic">Do.</span>
          </p>
          <p className="font-['Inter_Display:Regular',sans-serif] relative shrink-0 text-[24px] text-stone-400 tracking-[-0.8px] w-full text-center">a simple collaborative todo list workspace for your team.</p>
        </Animated>
        
        <div className="content-stretch flex flex-col gap-[64px] items-center w-[264px]">
          <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
            <Animated delay={30} className="w-full">
              <p className="font-['Inter_Display:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[18px] text-center text-stone-500 tracking-[-0.18px] w-[min-content]">create a workspace and invite your team members</p>
            </Animated>
            <div className="content-stretch flex items-start relative shrink-0 w-[264px]" data-name="Button">
              <div className="basis-0 bg-stone-500 hover:bg-stone-600 active:bg-stone-700 transition-colors grow min-h-px min-w-px relative rounded-[8px] shrink-0 cursor-pointer" data-name="_button" onClick={onCreateWorkspace}>
                <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                  <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[14px] relative w-full">
                    <p className="font-['Inter_Display:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[15px] text-center text-nowrap text-stone-50 whitespace-pre">create a workspace</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
            <Animated delay={30} className="w-full">
              <p className="font-['Inter_Display:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-center text-stone-500 tracking-[-0.18px] w-[240px]">or join a workspace by pasting the code</p>
            </Animated>
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Button">
                <div className="basis-0 grow min-h-px min-w-px relative rounded-[8px] shrink-0 cursor-pointer hover:bg-stone-50 active:bg-stone-100 transition-colors" data-name="_button" onClick={onJoinWorkspace}>
                  <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[14px] relative w-full">
                      <p className="font-['Inter_Display:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[15px] text-center text-nowrap text-stone-500 whitespace-pre">join a workspace</p>
                    </div>
                  </div>
                  <div aria-hidden="true" className="absolute border border-solid border-stone-500 inset-0 pointer-events-none rounded-[8px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}