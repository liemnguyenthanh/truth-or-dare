import { fireEvent,render, screen } from '@testing-library/react';

import { CategorySelection } from '@/app/quick/components/CategorySelection';

const mockCategories = [
  {
    id: '18',
    name: '18+',
    description: 'Câu hỏi dành cho người lớn',
    icon: '💜',
  },
  {
    id: 'party',
    name: 'Party',
    description: 'Câu hỏi vui nhộn cho bữa tiệc',
    icon: '🎉',
  },
];

describe('CategorySelection', () => {
  const mockOnCategorySelect = jest.fn();

  beforeEach(() => {
    mockOnCategorySelect.mockClear();
  });

  it('should render all categories', () => {
    render(
      <CategorySelection
        categories={mockCategories}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    expect(screen.getByText('18+')).toBeInTheDocument();
    expect(screen.getByText('Party')).toBeInTheDocument();
    expect(screen.getByText('Câu hỏi dành cho người lớn')).toBeInTheDocument();
    expect(screen.getByText('Câu hỏi vui nhộn cho bữa tiệc')).toBeInTheDocument();
  });

  it('should render category icons', () => {
    render(
      <CategorySelection
        categories={mockCategories}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    expect(screen.getByText('💜')).toBeInTheDocument();
    expect(screen.getByText('🎉')).toBeInTheDocument();
  });

  it('should call onCategorySelect when category is clicked', () => {
    render(
      <CategorySelection
        categories={mockCategories}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    const categoryButton = screen.getByText('18+').closest('button');
    fireEvent.click(categoryButton!);

    expect(mockOnCategorySelect).toHaveBeenCalledWith('18');
  });

  it('should call onCategorySelect for different categories', () => {
    render(
      <CategorySelection
        categories={mockCategories}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    const partyButton = screen.getByText('Party').closest('button');
    fireEvent.click(partyButton!);

    expect(mockOnCategorySelect).toHaveBeenCalledWith('party');
  });

  it('should handle empty categories array', () => {
    render(
      <CategorySelection
        categories={[]}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should handle single category', () => {
    const singleCategory = [mockCategories[0]];

    render(
      <CategorySelection
        categories={singleCategory}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    expect(screen.getByText('18+')).toBeInTheDocument();
    expect(screen.queryByText('Party')).not.toBeInTheDocument();
  });

  it('should have correct accessibility attributes', () => {
    render(
      <CategorySelection
        categories={mockCategories}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  it('should handle rapid clicks', () => {
    render(
      <CategorySelection
        categories={mockCategories}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    const categoryButton = screen.getByText('18+').closest('button');
    
    // Rapid clicks
    fireEvent.click(categoryButton!);
    fireEvent.click(categoryButton!);
    fireEvent.click(categoryButton!);

    expect(mockOnCategorySelect).toHaveBeenCalledTimes(3);
    expect(mockOnCategorySelect).toHaveBeenCalledWith('18');
  });
});
