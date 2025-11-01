import { fireEvent,render, screen } from '@testing-library/react';

import { TruthDareButtons } from '@/app/quick/components/TruthDareButtons';

const mockQuestion = {
  id: '1',
  type: 'truth' as const,
  question: 'Test question',
};

describe('TruthDareButtons', () => {
  const mockOnDrawCard = jest.fn();

  beforeEach(() => {
    mockOnDrawCard.mockClear();
  });

  it('should render truth and dare buttons', () => {
    render(
      <TruthDareButtons
        selectedType={null}
        currentQuestion={null}
        isDrawingCard={false}
        onDrawCard={mockOnDrawCard}
        showInitialSelection={true}
      />
    );

    expect(screen.getByText('Thật')).toBeInTheDocument();
    expect(screen.getByText('Thách')).toBeInTheDocument();
  });

  it('should render with correct icons', () => {
    render(
      <TruthDareButtons
        selectedType={null}
        currentQuestion={null}
        isDrawingCard={false}
        onDrawCard={mockOnDrawCard}
        showInitialSelection={true}
      />
    );

    expect(screen.getByText('💜')).toBeInTheDocument();
    expect(screen.getByText('💖')).toBeInTheDocument();
  });

  it('should call onDrawCard with truth when truth button is clicked', () => {
    render(
      <TruthDareButtons
        selectedType={null}
        currentQuestion={null}
        isDrawingCard={false}
        onDrawCard={mockOnDrawCard}
        showInitialSelection={true}
      />
    );

    const truthButton = screen.getByText('Thật').closest('button');
    fireEvent.click(truthButton!);

    expect(mockOnDrawCard).toHaveBeenCalledWith('truth');
  });

  it('should call onDrawCard with dare when dare button is clicked', () => {
    render(
      <TruthDareButtons
        selectedType={null}
        currentQuestion={null}
        isDrawingCard={false}
        onDrawCard={mockOnDrawCard}
        showInitialSelection={true}
      />
    );

    const dareButton = screen.getByText('Thách').closest('button');
    fireEvent.click(dareButton!);

    expect(mockOnDrawCard).toHaveBeenCalledWith('dare');
  });

  it('should disable buttons when isDrawingCard is true', () => {
    render(
      <TruthDareButtons
        selectedType={null}
        currentQuestion={null}
        isDrawingCard={true}
        onDrawCard={mockOnDrawCard}
        showInitialSelection={true}
      />
    );

    const truthButton = screen.getByText('Thật').closest('button');
    const dareButton = screen.getByText('Thách').closest('button');

    expect(truthButton).toBeDisabled();
    expect(dareButton).toBeDisabled();
  });

  it('should not call onDrawCard when buttons are disabled', () => {
    render(
      <TruthDareButtons
        selectedType={null}
        currentQuestion={null}
        isDrawingCard={true}
        onDrawCard={mockOnDrawCard}
        showInitialSelection={true}
      />
    );

    const truthButton = screen.getByText('Thật').closest('button');
    fireEvent.click(truthButton!);

    expect(mockOnDrawCard).not.toHaveBeenCalled();
  });

  it('should show correct heading for initial selection', () => {
    render(
      <TruthDareButtons
        selectedType={null}
        currentQuestion={null}
        isDrawingCard={false}
        onDrawCard={mockOnDrawCard}
        showInitialSelection={true}
      />
    );

    expect(screen.getByText('Chọn loại câu hỏi')).toBeInTheDocument();
  });

  it('should show correct heading for next question selection', () => {
    render(
      <TruthDareButtons
        selectedType="truth"
        currentQuestion={mockQuestion}
        isDrawingCard={false}
        onDrawCard={mockOnDrawCard}
        showInitialSelection={false}
      />
    );

    expect(screen.getByText('Chọn loại câu hỏi tiếp theo')).toBeInTheDocument();
  });

  it('should not render when showInitialSelection is false and no currentQuestion', () => {
    const { container } = render(
      <TruthDareButtons
        selectedType={null}
        currentQuestion={null}
        isDrawingCard={false}
        onDrawCard={mockOnDrawCard}
        showInitialSelection={false}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render when showInitialSelection is false but has currentQuestion', () => {
    render(
      <TruthDareButtons
        selectedType="truth"
        currentQuestion={mockQuestion}
        isDrawingCard={false}
        onDrawCard={mockOnDrawCard}
        showInitialSelection={false}
      />
    );

    expect(screen.getByText('Thật')).toBeInTheDocument();
    expect(screen.getByText('Thách')).toBeInTheDocument();
  });

  it('should handle rapid clicks', () => {
    render(
      <TruthDareButtons
        selectedType={null}
        currentQuestion={null}
        isDrawingCard={false}
        onDrawCard={mockOnDrawCard}
        showInitialSelection={true}
      />
    );

    const truthButton = screen.getByText('Thật').closest('button');
    
    // Rapid clicks
    fireEvent.click(truthButton!);
    fireEvent.click(truthButton!);
    fireEvent.click(truthButton!);

    expect(mockOnDrawCard).toHaveBeenCalledTimes(3);
  });

  it('should have correct button styling classes', () => {
    render(
      <TruthDareButtons
        selectedType={null}
        currentQuestion={null}
        isDrawingCard={false}
        onDrawCard={mockOnDrawCard}
        showInitialSelection={true}
      />
    );

    const truthButton = screen.getByText('Thật').closest('button');
    const dareButton = screen.getByText('Thách').closest('button');

    expect(truthButton).toHaveClass('bg-purple-600');
    expect(dareButton).toHaveClass('bg-pink-600');
  });
});
