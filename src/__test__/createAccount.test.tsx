import { screen } from "@testing-library/react";
import SignUp from "../Views/Pages/createAccount";
import { MemoryRouter } from "react-router-dom";
import { renderWithRedux } from "../Controllers/Redux/store";

describe("CREATE ACCOUNT", () => {
  it("submit and login buttons exists", () => {
    renderWithRedux(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const linkElement = screen.getByText(/Login/i);
    const submitElement = screen.getByText(/Submit/i);

    expect(linkElement).toBeInTheDocument();
    expect(submitElement).toBeInTheDocument();
  });

  //No tooltip
  // it("request email and password for submit", async () => {
  //   const { findByTestId } = render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <SignUp />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const btnElement = await findByTestId("submit-btn");

  //   await waitFor(() => fireEvent.click(btnElement));
  //});
});
