"use client"

import { URL } from "@/utils/url";
import React, { useState } from "react";



function PromptBox() {

const [summary, setSummary] = useState("");
const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSummary("");
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const url = formData.get("url") as string;
        const apiKey = formData.get("apiKey") as string;
        try {
            if(!url || !apiKey){
              setSummary("Please provide the required information.")
              setIsLoading(false);
              return;
            }
            const response = await fetch(`${URL}/summary`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({url, apiKey}),
              cache: "no-store",
            });
            const body = await response.json();
            if(response.ok !== true){
              setIsLoading(false);
              setSummary(body.summary);
            }else{
              setSummary(body.summary);
            }
            setIsLoading(false);
          } catch (error) {
            console.error("Error generating summary:", error);
            setIsLoading(false);
          }
    }


  return <section className="flex flex-col max-w-[600px] items-center gap-y-5">
<form className="flex flex-col gap-y-4" onSubmit={handleSubmit} >
    <label htmlFor="url">Site Link:</label>
    <div className="flex h-12 bg-white justify-between rounded-xl">
    <input type="text" id="url" name="url" placeholder="Enter the webpage URL to generate summary" className="h-full bg-transparent rounded-xl p-2 appearance-none caret-blue-500 caret focus:outline-none" />
    <button type="submit" className="bg-blue-500 w-[150px] h-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">{isLoading ?"Generating...": "Generate"}</button>
    </div>
    <label htmlFor="apikey">API key:</label>
    <input autoSave="off" type="password" id="apiKey" name="apiKey" placeholder="Enter your Open AI API key" className="h-12 bg-white rounded-xl py-2 px-4 appearance-none caret-blue-500 caret focus:outline-none" />
</form>

<div className="flex flex-col w-[600px] gap-y-3 bg-black bg-opacity-50 backdrop-blur-xl rounded-xl p-4 text-zinc-100">
  <h2>Summary: </h2>
    <p>{summary}</p>
</div>
  </section>;
}

export default PromptBox;
