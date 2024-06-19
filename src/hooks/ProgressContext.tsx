// // ProgressContext.tsx
// import React, {
//   createContext,
//   useContext,
//   useState,
//   Dispatch,
//   SetStateAction,
// } from 'react';

// interface ProgressContextType {
//   progress: number;
//   setProgress: Dispatch<SetStateAction<number>>;
// }

// const ProgressContext = createContext<ProgressContextType | undefined>(
//   undefined
// );

// export const useProgress = () => {
//   const context = useContext(ProgressContext);
//   if (!context) {
//     throw new Error('useProgress must be used within a ProgressProvider');
//   }
//   return context;
// };

// export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [progress, setProgress] = useState<number>(0);

//   return (
//     <ProgressContext.Provider value={{ progress, setProgress }}>
//       {children}
//     </ProgressContext.Provider>
//   );
// };

// export default ProgressContext;
