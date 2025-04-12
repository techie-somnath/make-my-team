"use client"
import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context data
interface DataContextType {
  data: Record<string,any>[];
  setData: (data: Record<string,any>[]) => void;
}

// Create the context with a default value
const DataContext = createContext<any | undefined>(undefined);

// Create a provider component
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [employee, SetEmployees] = useState<any |null>(null);
  const [history , setHistory]=useState<any | null>([]);

  return (
    <DataContext.Provider value={{ employee, SetEmployees, history, setHistory }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the DataContext
export const useEmployeeData = (): any => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};