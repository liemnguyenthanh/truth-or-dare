'use client';

import { useTranslation } from '@/hooks/useTranslation';

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
  const { t } = useTranslation({ namespaces: ['common'] });

  return (
    <div className={`${className || 'mt-8'} text-center`}>
      <PrimaryButton onClick={onClick} disabled={disabled} size='lg'>
        {t('buttons.continueNext')}
      </PrimaryButton>
    </div>
  );
}
