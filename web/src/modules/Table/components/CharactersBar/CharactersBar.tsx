import { useCharacters } from "@/shared/contexts/Characters/CharactersContext"
import { DraggableItem } from "../Map/components"
import { currentSession } from "@/shared/contexts/Users/mock-data"

export const CharactersBar = () => {
  const charactersContext = useCharacters()
  const { players, enemies, npcs } = charactersContext.getCharactersByType()

  return (
    <div className="flex flex-col items-center justify-start border-l py-2 min-w-[70px] border-border overflow-y-scroll overflow-x-hidden no-scrollbar h-screen">
      <div className="flex flex-col gap-2 w-full items-center mx-auto">
        <button className="background-black w-[38px] h-[38px] flex !cursor-default items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50">
          <svg
            width="24"
            height="24"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 100C120.627 100 137.5 83.1246 137.5 62.5C137.5 41.8754 120.627 25 100 25C79.373 25 62.5 41.8754 62.5 62.5C62.5 83.1246 79.373 100 100 100ZM100 118.75C75.157 118.75 25 131.407 25 156.25V175H175V156.25C175 131.407 124.843 118.75 100 118.75Z"
              fill="white"
            />
          </svg>
        </button>
        {players.map((character: ISheet, index: any) => (
          <div
            key={index}
            className="rounded-full w-[48px] h-[48px] overflow-hidden aspect-square"
          >
            <DraggableItem
              id={character.id}
              imgUrl={character.infos.characterUrl}
              type="box"
              player={index === 0}
              character={character}
            />
          </div>
        ))}
      </div>
      <div className="w-[50px] mx-auto my-4 h-0 border-t border-border" />
      <div className="flex flex-col gap-2 w-full items-center mx-auto">
        <button className="background-black w-[38px] h-[38px] flex !cursor-default items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50">
          <svg
            width="24"
            height="24"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M169.531 27.1881C167.857 26.038 165.926 25.3149 163.908 25.0821C161.89 24.8492 159.846 25.1136 157.953 25.8522C146.992 30.1178 124.859 37.2741 100 37.2741C75.1406 37.2741 53 30.1178 42.0234 25.8522C40.1296 25.117 38.085 24.8545 36.0669 25.0875C34.0487 25.3204 32.1177 26.0417 30.4411 27.1889C28.7645 28.3362 27.3928 29.8748 26.4447 31.6715C25.4966 33.4683 25.0007 35.4691 25 37.5006V81.071C25 109.071 32.5391 135.485 46.2344 155.43C60.4219 176.102 79.5156 187.462 100 187.462C120.484 187.462 139.578 176.079 153.766 155.43C167.461 135.501 175 109.087 175 81.0866V37.5006C174.996 35.4665 174.496 33.4639 173.543 31.6668C172.59 29.8697 171.213 28.3324 169.531 27.1881ZM60.9375 104.165C59.8321 105.408 58.2781 106.161 56.6174 106.258C54.9566 106.356 53.3252 105.79 52.082 104.684C50.8388 103.579 50.0857 102.025 49.9882 100.364C49.8908 98.7034 50.4571 97.072 51.5625 95.8288C56.0547 90.8444 64.2031 87.5006 71.875 87.5006C79.5469 87.5006 87.6953 90.8444 92.1875 95.8288C93.2929 97.072 93.8592 98.7034 93.7618 100.364C93.6643 102.025 92.9112 103.579 91.668 104.684C91.0524 105.232 90.335 105.652 89.5569 105.922C88.7787 106.193 87.9549 106.307 87.1326 106.258C85.4719 106.161 83.9179 105.408 82.8125 104.165C80.7187 101.821 75.8984 100.001 71.875 100.001C67.8516 100.001 63 101.829 60.9375 104.165ZM131.633 141.555C127.753 146.158 122.915 149.858 117.457 152.397C111.998 154.935 106.051 156.25 100.031 156.25C94.0115 156.25 88.0643 154.935 82.6058 152.397C77.1473 149.858 72.3091 146.158 68.4297 141.555C67.8377 140.942 67.3773 140.215 67.0768 139.417C66.7764 138.62 66.6421 137.769 66.6824 136.918C66.7227 136.067 66.9366 135.233 67.311 134.468C67.6854 133.702 68.2124 133.021 68.8596 132.467C69.5068 131.912 70.2605 131.496 71.0745 131.244C71.8884 130.992 72.7453 130.908 73.5926 130.999C74.4399 131.09 75.2597 131.354 76.0015 131.773C76.7433 132.192 77.3915 132.759 77.9063 133.438C80.6113 136.668 83.9914 139.265 87.8087 141.047C91.6259 142.829 95.7873 143.752 100 143.752C104.213 143.752 108.374 142.829 112.191 141.047C116.009 139.265 119.389 136.668 122.094 133.438C123.17 132.177 124.703 131.396 126.356 131.265C128.009 131.135 129.645 131.666 130.906 132.743C132.167 133.819 132.949 135.352 133.079 137.005C133.209 138.658 132.678 140.295 131.602 141.555H131.633ZM147.922 104.688C147.31 105.236 146.596 105.657 145.821 105.929C145.046 106.201 144.226 106.317 143.406 106.271C142.586 106.226 141.783 106.019 141.043 105.663C140.303 105.307 139.641 104.808 139.094 104.196C137 101.852 132.18 100.032 128.156 100.032C124.133 100.032 119.281 101.86 117.219 104.196C116.669 104.814 116.004 105.317 115.26 105.677C114.516 106.038 113.708 106.248 112.883 106.296C112.058 106.344 111.231 106.23 110.45 105.958C109.669 105.687 108.95 105.265 108.332 104.715C107.714 104.166 107.211 103.5 106.851 102.756C106.49 102.013 106.28 101.205 106.232 100.38C106.184 99.5545 106.298 98.7279 106.57 97.947C106.841 97.1662 107.263 96.4464 107.812 95.8288C112.273 90.8444 120.422 87.5006 128.125 87.5006C135.828 87.5006 143.945 90.8444 148.438 95.8288C148.988 96.4428 149.412 97.1599 149.685 97.9386C149.957 98.7173 150.073 99.5422 150.025 100.366C149.977 101.189 149.767 101.995 149.406 102.737C149.045 103.479 148.54 104.142 147.922 104.688Z"
              fill="white"
            />
          </svg>
        </button>
        {npcs.map((character: ISheet, index: any) => (
          <div
            key={index}
            className={`${
              currentSession.role !== "master" &&
              !character.infos.visibility &&
              " hidden invisible sr-only "
            } rounded-full w-[48px] h-[48px] overflow-hidden aspect-square`}
          >
            <DraggableItem
              id={character.id}
              imgUrl={character.infos.characterUrl}
              type="box"
              player={index === 0}
              character={character}
            />
          </div>
        ))}
      </div>
      <div className="w-[50px] mx-auto my-4 h-0 border-t border-border" />
      <div className="flex flex-col gap-2 w-full items-center mx-auto">
        <button className="background-black w-[38px] h-[38px] flex !cursor-default items-center justify-center text-white p-1 rounded-full shadow-md shadow-black/50">
          <svg
            width="24"
            height="24"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42.4915 100.023C42.6032 122.118 47.9536 139.799 52.2344 152.204C33.4223 124.122 12.0708 73.3542 47.0708 43.8074C30.4458 42.1238 10.9872 53.8839 9.65669 71.6249H9.58248C9.16529 77.114 10.5903 83.2484 14.1708 89.6456C6.37232 111.242 5.98872 135.042 19.3754 169.294C26.8676 188.453 47.0528 193.787 66.5442 190.364C80.7419 187.864 93.9622 181.51 102.987 167.023C118.674 141.835 126.421 125.844 142.749 114.125C160.923 106.399 180.85 112.855 191.14 122.896C188.219 100.415 163.641 79.3371 144.083 100.723C127.94 103.715 117.12 107.566 98.879 120.736C106.555 105.596 120.882 87.5671 129.789 76.8242C142.95 60.571 169.966 54.6288 183.9 58.0328C171.404 40.3218 133.932 34.7554 125.457 62.9273C109.047 70.4519 88.3876 86.6968 74.7114 103.16C79.2348 82.5558 87.6723 57.1503 95.9407 42.5324C109.154 28.2538 128.663 28.4964 140.715 32.1558C129.425 13.9542 93.3544 4.76517 86.6157 37.2312C69.7758 50.1531 52.5344 76.3367 42.4922 100.023L42.4915 100.023Z"
              fill="white"
            />
          </svg>
        </button>
        {enemies.map((character: ISheet, index: any) => (
          <div
            key={index}
            className={`${
              currentSession.role !== "master" &&
              !character.infos.visibility &&
              " hidden invisible sr-only "
            } rounded-full w-[48px] h-[48px] overflow-hidden aspect-square`}
          >
            <DraggableItem
              id={character.id}
              imgUrl={character.infos.characterUrl}
              type="box"
              player={index === 0}
              character={character}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
