import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";

type Breakpoint = {
  width: number;
  columns: number;
};

// This function encapsulates the logic for getting the number of columns based on the window width
// It sorts the breakpoints in descending order and finds the first one where the window width is greater or equal
// If no such breakpoint is found, it defaults to 1 column
const getNumberOfColumns = (
  width: number,
  breakpoints: Breakpoint[]
): number => {
  const sortedBreakpoints = [...breakpoints].sort((a, b) => b.width - a.width);
  const appropriateBreakpoint = sortedBreakpoints.find(
    (breakpoint) => width >= breakpoint.width
  );
  return appropriateBreakpoint?.columns ?? 1;
};

const useResponsiveNumColumns = (breakpoints: Breakpoint[]): number => {
  const { width } = useWindowDimensions();

  // Initialize state with the correct number of columns
  const [numColumns, setNumColumns] = useState(() =>
    getNumberOfColumns(width, breakpoints)
  );

  // Update the number of columns whenever the window width changes
  useEffect(() => {
    setNumColumns(getNumberOfColumns(width, breakpoints));
  }, [width, breakpoints]);

  return numColumns;
};

export default useResponsiveNumColumns;
