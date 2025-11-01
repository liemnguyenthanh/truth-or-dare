import { render, screen } from '@testing-library/react';

import { QuestionCard } from '@/app/quick/components/QuestionCard';

const mockQuestion = {
  id: '1',
  type: 'truth' as const,
  question: 'Test truth question',
};

const mockDareQuestion = {
  id: '2',
  type: 'dare' as const,
  question: 'Test dare question',
};

describe('QuestionCard', () => {
  it('should render truth question', () => {
    render(
      <QuestionCard
        selectedType="truth"
        currentQuestion={mockQuestion}
        isDrawingCard={false}
      />
    );

    expect(screen.getByText('Test truth question')).toBeInTheDocument();
    expect(screen.getByText('💜')).toBeInTheDocument();
  });

  it('should render dare question', () => {
    render(
      <QuestionCard
        selectedType="dare"
        currentQuestion={mockDareQuestion}
        isDrawingCard={false}
      />
    );

    expect(screen.getByText('Test dare question')).toBeInTheDocument();
    expect(screen.getByText('💖')).toBeInTheDocument();
  });

  it('should show loading state when isDrawingCard is true', () => {
    render(
      <QuestionCard
        selectedType="truth"
        currentQuestion={null}
        isDrawingCard={true}
      />
    );

    expect(screen.getByText('Đang lật bài...')).toBeInTheDocument();
    expect(screen.getByText('🎴')).toBeInTheDocument();
  });

  it('should not render question when no currentQuestion and not drawing', () => {
    const { container } = render(
      <QuestionCard
        selectedType="truth"
        currentQuestion={null}
        isDrawingCard={false}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should show correct type indicator for truth', () => {
    render(
      <QuestionCard
        selectedType="truth"
        currentQuestion={mockQuestion}
        isDrawingCard={false}
      />
    );

    expect(screen.getByText('Thật')).toBeInTheDocument();
  });

  it('should show correct type indicator for dare', () => {
    render(
      <QuestionCard
        selectedType="dare"
        currentQuestion={mockDareQuestion}
        isDrawingCard={false}
      />
    );

    expect(screen.getByText('Thách')).toBeInTheDocument();
  });

  it('should handle null selectedType', () => {
    render(
      <QuestionCard
        selectedType={null}
        currentQuestion={mockQuestion}
        isDrawingCard={false}
      />
    );

    expect(screen.getByText('Test truth question')).toBeInTheDocument();
  });

  it('should handle long question text', () => {
    const longQuestion = {
      id: '3',
      type: 'truth' as const,
      question: 'This is a very long question that should wrap properly and not break the layout or cause any overflow issues in the card component',
    };

    render(
      <QuestionCard
        selectedType="truth"
        currentQuestion={longQuestion}
        isDrawingCard={false}
      />
    );

    expect(screen.getByText(longQuestion.question)).toBeInTheDocument();
  });

  it('should handle special characters in question', () => {
    const specialQuestion = {
      id: '4',
      type: 'dare' as const,
      question: 'Question with special chars: @#$%^&*()_+-=[]{}|;:,.<>?',
    };

    render(
      <QuestionCard
        selectedType="dare"
        currentQuestion={specialQuestion}
        isDrawingCard={false}
      />
    );

    expect(screen.getByText(specialQuestion.question)).toBeInTheDocument();
  });

  it('should handle empty question text', () => {
    const emptyQuestion = {
      id: '5',
      type: 'truth' as const,
      question: '',
    };

    render(
      <QuestionCard
        selectedType="truth"
        currentQuestion={emptyQuestion}
        isDrawingCard={false}
      />
    );

    // Should still render the card structure
    expect(screen.getByText('Thật')).toBeInTheDocument();
  });

  it('should have correct card styling classes', () => {
    const { container } = render(
      <QuestionCard
        selectedType="truth"
        currentQuestion={mockQuestion}
        isDrawingCard={false}
      />
    );

    const card = container.querySelector('.bg-white');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('border-purple-200');
  });
});
