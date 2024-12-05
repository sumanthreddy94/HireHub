import React from "react";
import { render, screen } from "@testing-library/react";
import MyJobs from "../components/Job/MyJobs";

describe("MyJobs Component", () => {
    test("renders MyJobs component correctly", () => {
        render(<MyJobs />);
        const myJobsElement = screen.getByText(/my jobs/i);
        expect(myJobsElement).toBeInTheDocument();
    });

    test("displays loading state initially", () => {
        render(<MyJobs />);
        const loadingElement = screen.getByText(/loading/i);
        expect(loadingElement).toBeInTheDocument();
    });

    test("renders job list when jobs are available", () => {
        const mockJobs = [
            { id: 1, title: "Job 1" },
            { id: 2, title: "Job 2" },
        ];
        render(<MyJobs jobs={mockJobs} />);
        const job1Element = screen.getByText(/job 1/i);
        const job2Element = screen.getByText(/job 2/i);
        expect(job1Element).toBeInTheDocument();
        expect(job2Element).toBeInTheDocument();
    });

    test("displays no jobs message when no jobs are available", () => {
        render(<MyJobs jobs={[]} />);
        const noJobsElement = screen.getByText(/no jobs available/i);
        expect(noJobsElement).toBeInTheDocument();
    });
});
