import { create } from 'zustand';

const useAIStore = create((set) => ({
    activeLesson: null,
    setActiveLesson: (lesson) => set({ activeLesson: lesson }),
    nudgeAI: (topic, context) => set({
        activeLesson: { title: topic, aiInfo: context }
    }),
    triggerAIPrompt: null,
    setTriggerAIPrompt: (prompt) => set({ triggerAIPrompt: prompt }),
}));

export default useAIStore;
