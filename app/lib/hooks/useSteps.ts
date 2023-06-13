import React from "react";

export function useSteps(steps: string[], initialStep: number = 0) {
  const [currentStep, setCurrentStep] = React.useState<number>(initialStep);
  const maxStep = React.useMemo(() => steps.length, []);
  const setNextStep = React.useCallback(() => {
    if (currentStep >= maxStep) return;
    setCurrentStep(currentStep + 1);
  }, [currentStep, maxStep]);

  const setPreviousStep = React.useCallback(() => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  }, [currentStep, maxStep]);

  const setStep = React.useCallback(
    (step: number) => {
      if (currentStep === 0) return;
      if (currentStep >= maxStep) return;
      setCurrentStep(step);
    },
    [currentStep, maxStep]
  );

  return React.useMemo(
    () => ({
      steps,
      currentStep,
      setNextStep,
      setPreviousStep,
      setStep,
    }),
    [steps, currentStep, setNextStep, setPreviousStep, setStep]
  );
}
