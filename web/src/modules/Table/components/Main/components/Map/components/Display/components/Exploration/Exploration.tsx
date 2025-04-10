"use client"

import React, { useState, DragEvent, useRef, useEffect, Fragment } from "react"
import { DraggableItem } from "@/shared/components/ui"
import { useMaps } from "@/shared/contexts"

export const Exploration: React.FC<{
  map: IMap
}> = ({ map }) => {
  const { moveSheet } = useMaps()

  const [sheetsPostions, setSheetsPositions] = useState<SheetPosition[]>(
    map.positions ?? []
  )
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 })
  const [isItemDragging, setIsItemDragging] = useState(false)
  const showResetMap = zoom !== 1 || position.x !== 0 || position.y !== 0

  const handleDrop = async (e: DragEvent<HTMLDivElement>, x: number, y: number) => {
    e.preventDefault()

    const sheetId = e.dataTransfer.getData("id")
    const characterUrl = e.dataTransfer.getData("characterUrl")
    const ownerId = e.dataTransfer.getData("ownerId")
    const isOwner = e.dataTransfer.getData("isOwner") === "true" ? true : false

    const newSheetPosition = {
      sheetId,
      mapId: map.id,
      characterUrl,
      ownerId,
      isOwner,
      position: {
        x,
        y,
      },
    }

    if (!isOwner) return null

     moveSheet(newSheetPosition).then(() => {
      setSheetsPositions((prev) => {
        const existingSheetPosition = prev.find(
          (sheet) => sheet.sheetId === sheetId
        )
        if (existingSheetPosition) {
          return prev.map((item) =>
            item.sheetId === sheetId ? newSheetPosition : item
          )
        } else {
          return [...prev, newSheetPosition]
        }
      })
    })
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const resetConfig = () => (
    setZoom(1),
    setPosition({
      x: Math.min(Math.max(0)),
      y: Math.min(Math.max(0)),
    })
  )

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()

    const mouseX = e.clientX - e.currentTarget.getBoundingClientRect().left
    const mouseY = e.clientY - e.currentTarget.getBoundingClientRect().top

    const newZoom =
      e.deltaY < 0 ? Math.min(zoom + 0.5, 5) : Math.max(zoom - 0.5, 0.5)

    const scaleDifference = newZoom / zoom

    setPosition((prevPosition) => {
      const newPosX = prevPosition.x - mouseX * (scaleDifference - 1)
      const newPosY = prevPosition.y - mouseY * (scaleDifference - 1)
      setZoom(newZoom)
      return {
        x: newPosX,
        y: newPosY,
      }
    })
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isItemDragging) return
    setIsDragging(true)
    setStartDragPos({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const newPosX = e.clientX - startDragPos.x
    const newPosY = e.clientY - startDragPos.y

    setPosition({
      x: Math.min(Math.max(newPosX)),
      y: Math.min(Math.max(newPosY)),
    })
  }

  const handleMouseUp = () => setIsDragging(false)

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      <div className="px-2 border border-border bg-background w-fit z-50 shadow-sm shadow-black/50 rounded-full font-medium text-xl absolute bottom-4 right-4">
        <span className="background-gradient bg-clip-text text-transparent whitespace-nowrap select-none cursor-default pointer-events-none">
          {map.name}
        </span>
      </div>

      <img
        src="/wood-wallpaper.jpg"
        className="absolute w-full h-screen object-fill inset-0 select-none pointer-events-none opacity-10 z-0"
        alt=""
      />

      {showResetMap && (
        <div
          onClick={resetConfig}
          className="absolute top-2 left-2 z-50 flex gap-2"
        >
          <div className="flex select-none cursor-pointer items-center group w-fit gap-x-2">
            <button className="bg-ashes flex items-center justify-center text-white p-1 rounded-full  shadow-md shadow-black/50 group-hover:bg-gradient-to-tr group-hover:from-[#42d392] group-hover:to-[#8B5CF6] duration-300 ease-in-out transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#FFFFFF"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z"></path>
              </svg>
            </button>
            <span>Default View</span>
          </div>
        </div>
      )}
      <div
        className="w-full min-h-[100vh] shadow-2xl shadow-black grid absolute"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          gridTemplateColumns: `repeat(${map.gridSize![0]}, 1fr)`,
          gridTemplateRows: `repeat(${map.gridSize![1]}, 1fr)`,
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          transformOrigin: "top left",
          cursor: isDragging ? "grabbing" : "grab",
          // aspectRatio: "1 / 1",
          overflow: "hidden",
        }}
      >
        {map.visibility === "low" && (
          <FogOfWar map={map} sheetsPostions={sheetsPostions} />
        )}
        <img
          src={map.imageUrl}
          alt="Mapa"
          className="absolute z-0 w-full h-full object-fill select-none pointer-events-none"
        />

        {Array.from({ length: map.gridSize![1] }).map((_, rowIndex) =>
          Array.from({ length: map.gridSize![0] }).map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onDrop={(e) => handleDrop(e, colIndex, rowIndex)}
              onDragOver={handleDragOver}
              className="relative select-none w-full border border-transparent flex items-center justify-center z-50 aspect-square overflow-hidden h-fit mx-auto"
            >
              <div>
                {/* <Fragment>{`${rowIndex}-${colIndex}`}</Fragment> */}
                {sheetsPostions
                  .filter(
                    (sheetPostion) =>
                      sheetPostion.position.x === colIndex &&
                      sheetPostion.position.y === rowIndex
                  )
                  .map((matchSheet) => (
                    <DraggableItem
                      key={matchSheet.sheetId}
                      sheetId={matchSheet.sheetId}
                      characterUrl={matchSheet.characterUrl}
                      ownerId={matchSheet.ownerId}
                      setIsItemDragging={setIsItemDragging}
                    />
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export const FogOfWar: React.FC<{
  map: IMap
  sheetsPostions: SheetPosition[]
}> = ({ map, sheetsPostions }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    ctx.fillStyle = "#090909"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.globalCompositeOperation = "destination-out"

    sheetsPostions.forEach((item) => {
      const cellWidth = canvas.width / map.gridSize![0]
      const cellHeight = canvas.height / map.gridSize![1]

      const gridX = (item.position.x + 0.5) * cellWidth
      const gridY = (item.position.y + 0.5) * cellHeight
      const radius = Math.max(cellWidth, cellHeight) * 2

      const gradient = ctx.createRadialGradient(
        gridX,
        gridY,
        radius * 0.3,
        gridX,
        gridY,
        radius
      )

      gradient.addColorStop(0, "rgba(9, 9, 9, 1)")
      gradient.addColorStop(1, "rgba(9, 9, 9, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(gridX, gridY, radius, 0, Math.PI * 2)
      ctx.fill()
    })

    ctx.globalCompositeOperation = "source-over"
  }, [map, sheetsPostions])

  return (
    <canvas
      ref={canvasRef}
      className="absolute z-[600] top-0 left-0 w-full h-full select-none pointer-events-none"
    />
  )
}
