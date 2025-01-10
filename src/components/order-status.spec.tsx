import { OrderStatus } from "./order-status";
import { render } from '@testing-library/react'; 

describe("OrderStatus", () => {
  it('should display the right text based on the status', () => {
    const wrapper = render(<OrderStatus status="pending" />);

    wrapper.debug();

    const statusText = wrapper.getByText('Pendente');

    console.log(statusText.outerHTML);

    expect(statusText).toBeInTheDocument();
  });
});
