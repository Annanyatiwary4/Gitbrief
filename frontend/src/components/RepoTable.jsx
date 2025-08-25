"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

export default function RepoTable({ token }) {
  const navigate = useNavigate();
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("http://localhost:5000/api/repos", {
        credentials: "include", // <-- send cookies
      });
      const data = await res.json();
      setRepos(data);
    };
    load();
  }, []);

   const handleConnect = (repo) => {
    // navigate to PRTable page with repo details
    navigate(`/prs/${repo.full_name}`, { state: { repo } });
  };


  return (
    <Table className="bg-black rounded-4xl shadow-md border border-gray-200">
      <TableHeader>
        <TableRow className="bg-black">
          <TableHead className="w-[150px] text-white font-semibold">
            Name
          </TableHead>
          <TableHead className="text-white font-semibold">
            Visibility
          </TableHead>
          <TableHead className="text-white font-semibold">
            Language
          </TableHead>
          <TableHead className="text-right text-white font-semibold">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {repos.map((repo) => (
          <TableRow key={repo.id} className="hover:bg-neutral-400 cursor-pointer">
            <TableCell className="font-medium text-white">
              {repo.full_name}
            </TableCell>
            <TableCell className="text-white">
              {repo.visibility}
            </TableCell>
            <TableCell className="text-white">
              {repo.language || "N/A"}
            </TableCell>
            <TableCell className="text-right space-x-3">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View
              </a>
              <button
                onClick={() => handleConnect(repo)}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                Connect
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="bg-black">
          <TableCell colSpan={3} className="text-white font-semibold">
            Total Repos
          </TableCell>
          <TableCell className="text-right font-medium text-white">
            {repos.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
