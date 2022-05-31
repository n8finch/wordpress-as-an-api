import React from "react";
import axios from "axios";
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// Does the app render?
test("renders reddit reader title", () => {
	render(<App />);

	const appTitle = screen.getByText("Reddit Reader");
	expect(appTitle).toBeVisible();
});

// Is the searchbox rendered and enabled?
test("renders enabled searchbox", () => {
	render(<App />);

	const searchBox = screen.getByTestId("searchBox");
	expect(searchBox).toBeVisible();
	expect(searchBox).toBeEnabled();
});

// Will the searchbox remove disallowed characters from the
test("searchbox text is modified", () => {
	render(<App />);

	const searchBox = screen.getByTestId("searchBox");
	expect(searchBox.value).toBe(""); // empty before
	fireEvent.change(searchBox, { target: { value: "Hey !@#$%^&*()- There_" } });
	expect(searchBox.value).toBe("HeyThere_"); // because spaces should be removed
});

// Does the request to Reddirt render as expected, in this case, two cards?
jest.mock("axios");
test("fetches subreddits from an API and displays them", async () => {
	// This should be the shape we get back from Reddit.
	const response = {
		data: {
			data: {
				after: "t3_abcd",
				before: "t3_abcd",
				children: [
					{
						kind: "t3",
						data: {
							title: "A subreddit title",
							selftext: "Some serious lorem ipsum.",
							ups: 101,
						},
					},
					{
						kind: "t3",
						data: {
							title: "Another subreddit title",
							selftext: "Some other serious lorem ipsum.",
							ups: 47,
						},
					},
				],
			},
		},
	};

	//
	axios.get.mockImplementationOnce(() => Promise.resolve(response));

	render(<App />);


	await act(async () => {
		// The searchbox needs text to be able to make the request.
		await fireEvent.change(screen.getByTestId("searchBox"), {
			target: { value: "Good Day" },
		});

		// Fire that click, pew pew pew!!!
		await userEvent.click(screen.getByTestId("searchPosts"));
	});

	const items = screen.getAllByTestId("cardTitle");

	// Since we have two items in the mocked array, we can see if there are two card titles that get rendered.
	expect(items).toHaveLength(2);
});
