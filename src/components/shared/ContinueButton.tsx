'use client';

import { PrimaryButton } from './PrimaryButton';

interface ContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function ContinueButton({
  onClick,
  disabled = false,
  className = '',
}: ContinueButtonProps) {
  return (
    <div className={`${className || 'mt-8'} text-center`}>
      <PrimaryButton onClick={onClick} disabled={disabled} size='lg'>
        Quay tiếp
      </PrimaryButton>
    </div>
  );
}

