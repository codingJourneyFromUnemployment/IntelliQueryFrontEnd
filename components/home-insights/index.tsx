"use client";
import { useEffect } from "react";
import useStore from "../../store/store";
import Link from "next/link";
import { communityContent } from "../../types/store";

export default function HomeInsights() {
  const { communityContent, setCommunityContent } = useStore();

  async function fetchCommunityContents() {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${baseUrl}`);
      const data = await res.json();
      const communityContent = data.communityContent.map((item : communityContent) => ({
        ...item,
        content: JSON.parse(item.content), // Parse the content string
      }));
      setCommunityContent(communityContent);
      localStorage.setItem(
        "communityContent",
        JSON.stringify(communityContent)
      );
      console.log("stored communityContent:", JSON.stringify(communityContent));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCommunityContents();
  } , []);

  return (
    <div className="flex flex-col md:ml-20 lg:ml-32 xl:ml-96 xl:w-1/2 mx-4 mt-24">
      {communityContent?.length > 0 && (
        <h2 className="text-xl font-bold text-gradient-primary text-start mb-6">
          Community Content:
        </h2>
      )}
      <ul
        role="list"
        className="px-2 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {communityContent.map((content) => (
          <li key={content.queryId} className="relative">
            <Link href={`/content/${content.queryId}`} target="_blank">
              <div className="group aspect-h-7 aspect-w-20 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-300 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img
                  alt=""
                  src={content.img}
                  className="pointer-events-none object-cover group-hover:opacity-70"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
