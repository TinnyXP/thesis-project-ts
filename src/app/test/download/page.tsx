"use client"

import React from "react"

import { Footer, NavBar } from "@/components"
import { Button } from "@heroui/react"

import { FiDownload } from "react-icons/fi"

export default function Page() {
  return (
    <div className="font-[family-name:var(--font-line-seed-sans)]">
      <NavBar />
      <div className="container mx-auto max-w-5xl flex-grow px-4 my-5 flex flex-col items-center gap-7">
        <DownlaodHeader />
        <DownlaodList />
      </div>
      <Footer />
    </div>
  )
}

const DownlaodHeader = () => {

  return (
    <div className="border-2 p-4 border-primary-color rounded-lg">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-color dark:text-white">Download Center</h1>
        <p className="text-default-500 dark:gray-500/80 text-xs md:text-sm mt-1">Download all the files you need here</p>
      </div>
    </div>
  );
};

const DownlaodList = () => {

  const groupedFiles = [
    {
      title: "หัวข้อไฟล์ที่ 1",
      files: [
        { name: "แผนที่โครงการวิจัย", description: "File : project-map.pdfproject-map.pdfproject-map.pdfproject-map.pdfproject-map.pdfproject-map.pdfproject-map.pdfproject-map.pdf", size: "3 MB", date: "2025-01-02", url: "#" },
        { name: "สรุปรายงานการประชุม", description: "File : meeting-summary.docx", size: "2 MB", date: "2025-01-01", url: "#" },
      ]
    },
    {
      title: "หัวข้อไฟล์ที่ 2",
      files: [
        { name: "ภาพรวมของโครงการ", description: "File : overview.pptx", size: "10 MB", date: "2025-01-03", url: "#" },
        { name: "ตัวอย่างการออกแบบ", description: "File : design-sample.zip", size: "50 MB", date: "2025-01-04", url: "#" },
        { name: "รายงานทางเทคนิค", description: "File : technical-report.pdf", size: "15 MB", date: "2025-01-05", url: "#" },
      ]
    },
    {
      title: "หัวข้อไฟล์ที่ 3",
      files: [
        { name: "ข้อมูลเบื้องต้นเกี่ยวกับระบบ", description: "File : system-info.pdf", size: "8 MB", date: "2025-01-05", url: "#" },
        { name: "คู่มือการติดตั้ง", description: "File : installation-guide.docx", size: "5 MB", date: "2025-01-06", url: "#" },
      ]
    }
  ];

  return (
    <div className="w-full">
      {groupedFiles.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-5">
          {/* Section title */}
          <div>
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary-color">{group.title}</span>
              <div className="flex-1 h-[2px] bg-gradient-to-r from-primary-color via-primary-color/50 to-transparent ml-4"></div>
            </div>
          </div>

          {/* Files in the group */}
          <div className="mx-4">
            {group.files.map((file, fileIndex) => (
              <React.Fragment key={fileIndex}>
                <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  {/* Top row */}
                  <div className="flex-[5.5]">
                    <div className="w-full text-md font-bold">{file.name}</div>
                    <div className="w-full text-sm text-default-500 dark:gray-500/80 mb-2">{file.description}</div>
                  </div>

                  {/* Bottom row */}
                  <div className="flex-[4.5] flex flex-wrap justify-between text-sm items-start sm:items-center mt-4 sm:mt-0">
                    <div className="text-left mb-2 sm:mb-0">
                      <div className="font-bold text-primary-color">File Size</div>
                      <div>{file.size}</div>
                    </div>
                    <div className="text-left mb-2 sm:mb-0">
                      <div className="font-bold text-primary-color">Release Date</div>
                      <div>{file.date}</div>
                    </div>
                    <div className="text-right">
                      <Button
                        size="md"
                        radius="sm"
                        variant="ghost"
                        color="primary"
                        startContent={<FiDownload />}
                        href={file.url}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
                {fileIndex < group.files.length - 1 && <div className="border-t border-gray-200/80 dark:border-gray-200/20 mx-4"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
