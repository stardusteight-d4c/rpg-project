"use client"
import React, { useState } from "react"

export const CallOfCthulhu = () => {
  const [activeItems, setActiveItems] = useState<
    Array<"attributes" | "skills" | "inventory" | "combat" | "backstory" | null>
  >([null])
  // Atributos típicos de Call of Cthulhu
  const attributes = {
    strength: 50,
    dexterity: 60,
    intelligence: 70,
    power: 65,
    constitution: 55,
    appearance: 60,
    size: 50,
    education: 70,
  }

  const infos = {
    name: "Erwin Farwell",
    player: "Gabriel Sena",
    age: 42,
    sex: "male",
    occupation: "Journalist and Private Detective",
  }

  // Habilidades comuns
  const skills = [
    { name: "Accounting", value: 5 },
    { name: "Anthropology", value: 1 },
    { name: "Appraise", value: 5 },
    { name: "Archaeology", value: 1 },
    { name: "Charm", value: 15 },
    { name: "Climb", value: 20 },
    { name: "Credit Rating", value: 0 },
    { name: "Cthulhu Mythos", value: 0 },
    { name: "Disguise", value: 5 },
    { name: "Dodge", value: "half DEX" },
    { name: "Drive Auto", value: 20 },
    { name: "Elec Repair", value: 10 },
    { name: "Fast Talk", value: 5 },
    { name: "Fighting(Brawl)", value: 25 },
    { name: "Firearms(HG)", value: 20 },
    { name: "Firearms(R/S)", value: 25 },
    { name: "First Aid", value: 30 },
    { name: "History", value: 5 },
    { name: "Intimidate", value: 15 },
    { name: "Jump", value: 20 },
    { name: "Language(Own)", value: "EDU" },
    { name: "Law", value: 5 },
    { name: "Library Use", value: 20 },
    { name: "Listen", value: 20 },
    { name: "Locksmith", value: 1 },
    { name: "Luck", value: 65 },
    { name: "Mech Repair", value: 10 },
    { name: "Medicine", value: 1 },
    { name: "Natural World", value: 10 },
    { name: "Navigate", value: 10 },
    { name: "Occult", value: 5 },
    { name: "Op Hv Machine", value: 1 },
    { name: "Persuade", value: 10 },
    { name: "Psychoanalysis", value: 1 },
    { name: "Psychology", value: 10 },
    { name: "Ride", value: 5 },
    { name: "Sleight of Hand", value: 10 },
    { name: "Spot Hidden", value: 25 },
    { name: "Stealth", value: 20 },
    { name: "Swim", value: 20 },
    { name: "Throw", value: 20 },
    { name: "Track", value: 10 },
  ]

  function toggleItem(
    item: "attributes" | "skills" | "inventory" | "combat" | "backstory"
  ) {
    setActiveItems((prev) => {
      if (prev.includes(item)) {
        // Remove o item se ele já estiver no array
        return prev.filter((i) => i !== item)
      } else {
        // Adiciona o item se ele não estiver no array
        return [...prev, item]
      }
    })
  }

  return (
    <section className="p-2 h-screen overflow-y-scroll no-scrollbar">
      <div className="flex mb-4">
        <img
          src="https://imgcdn.stablediffusionweb.com/2024/10/24/23cb7d83-7cac-43f6-8ac8-84c9cd8475a6.jpg"
          alt="Imagem do Personagem"
          className="w-[210px] border border-border h-[210px] object-cover rounded "
        />
        <div className="w-full px-4">
          <div className="flex items-center gap-x-2">
            <span className="block text-3xl font-bold background-gradient bg-clip-text text-transparent tracking-wider">
              {infos.name}{" "}
            </span>
            {infos.sex === "male" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#3b82f6"
                viewBox="0 0 256 256"
                className="bg-border p-1 rounded-full"
              >
                <path d="M216,32H168a8,8,0,0,0,0,16h28.69L154.62,90.07a80,80,0,1,0,11.31,11.31L208,59.32V88a8,8,0,0,0,16,0V40A8,8,0,0,0,216,32ZM149.24,197.29a64,64,0,1,1,0-90.53A64.1,64.1,0,0,1,149.24,197.29Z"></path>
              </svg>
            )}
            {infos.sex === "female" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#ec4899"
                viewBox="0 0 256 256"
                className="bg-border p-1 rounded-full"
              >
                <path d="M208,96a80,80,0,1,0-88,79.6V200H88a8,8,0,0,0,0,16h32v24a8,8,0,0,0,16,0V216h32a8,8,0,0,0,0-16H136V175.6A80.11,80.11,0,0,0,208,96ZM64,96a64,64,0,1,1,64,64A64.07,64.07,0,0,1,64,96Z"></path>
              </svg>
            )}
          </div>
          <span className="text-sm text-gray-400 block">
            {infos.occupation} in Call of Cthulhu
          </span>
          <div className="mt-2">
            <div className="mt-2 flex w-full items-center gap-2">
              <div className="w-full">
                <div className="flex  justify-between">
                  <span className="font-medium">Hit Points</span>
                  <span>58%</span>{" "}
                </div>
                <div className="w-full bg-border overflow-hidden h-3 rounded-full">
                  <div
                    className="h-full bg-gradient-to-tr from-red-500 to-red-400"
                    style={{ width: "58%" }}
                  ></div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <span className="font-medium">Magic Points</span>
                  <span>28%</span>{" "}
                </div>
                <div className="w-full bg-border overflow-hidden h-3 rounded-full">
                  <div
                    className="h-full bg-gradient-to-tr from-blue-500 to-blue-400"
                    style={{ width: "28%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="font-medium">Sanity</span>
              <span>78%</span>{" "}
            </div>
            <div className="w-fit mx-auto relative">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              >
                <path
                  d="M31 15.4995C30.9986 14.1749 30.6223 12.8778 29.9144 11.7582C29.2065 10.6387 28.196 9.74243 27 9.17326V8.99951C26.9988 7.71104 26.5829 6.45716 25.8138 5.4234C25.0447 4.38965 23.9632 3.63094 22.7294 3.25955C21.4957 2.88815 20.1751 2.92379 18.9631 3.36119C17.7512 3.7986 16.7122 4.61453 16 5.68826C15.2877 4.61453 14.2488 3.7986 13.0368 3.36119C11.8248 2.92379 10.5043 2.88815 9.27048 3.25955C8.03669 3.63094 6.95523 4.38965 6.18612 5.4234C5.41702 6.45716 5.00111 7.71104 4.99996 8.99951V9.17326C3.80288 9.74087 2.79146 10.6365 2.08322 11.7562C1.37499 12.8758 0.999023 14.1734 0.999023 15.4983C0.999023 16.8231 1.37499 18.1207 2.08322 19.2404C2.79146 20.36 3.80288 21.2557 4.99996 21.8233V21.9995C5.00111 23.288 5.41702 24.5419 6.18612 25.5756C6.95523 26.6094 8.03669 27.3681 9.27048 27.7395C10.5043 28.1109 11.8248 28.0752 13.0368 27.6378C14.2488 27.2004 15.2877 26.3845 16 25.3108C16.7122 26.3845 17.7512 27.2004 18.9631 27.6378C20.1751 28.0752 21.4957 28.1109 22.7294 27.7395C23.9632 27.3681 25.0447 26.6094 25.8138 25.5756C26.5829 24.5419 26.9988 23.288 27 21.9995V21.8233C28.1958 21.2545 29.2062 20.3587 29.9141 19.2396C30.622 18.1205 30.9985 16.8237 31 15.4995ZM11 25.9995C10.0136 25.9994 9.06216 25.6348 8.32824 24.9759C7.59433 24.317 7.12974 23.4101 7.02371 22.4295C7.34709 22.4756 7.67331 22.499 7.99996 22.4995H8.99996C9.26518 22.4995 9.51953 22.3942 9.70707 22.2066C9.8946 22.0191 9.99996 21.7647 9.99996 21.4995C9.99996 21.2343 9.8946 20.9799 9.70707 20.7924C9.51953 20.6049 9.26518 20.4995 8.99996 20.4995H7.99996C6.81941 20.5009 5.67645 20.0845 4.77343 19.3241C3.87042 18.5636 3.2656 17.5082 3.06606 16.3446C2.86652 15.1811 3.08513 13.9844 3.68318 12.9666C4.28123 11.9487 5.22016 11.1753 6.33371 10.7833C6.52855 10.7143 6.69723 10.5866 6.81654 10.4178C6.93585 10.2491 6.99993 10.0475 6.99996 9.84076V8.99951C6.99996 7.93865 7.42139 6.92123 8.17153 6.17108C8.92168 5.42094 9.93909 4.99951 11 4.99951C12.0608 4.99951 13.0782 5.42094 13.8284 6.17108C14.5785 6.92123 15 7.93865 15 8.99951V17.532C13.9019 16.5444 12.4769 15.9984 11 15.9995C10.7347 15.9995 10.4804 16.1049 10.2929 16.2924C10.1053 16.4799 9.99996 16.7343 9.99996 16.9995C9.99996 17.2647 10.1053 17.5191 10.2929 17.7066C10.4804 17.8942 10.7347 17.9995 11 17.9995C12.0608 17.9995 13.0782 18.4209 13.8284 19.1711C14.5785 19.9212 15 20.9386 15 21.9995C15 23.0604 14.5785 24.0778 13.8284 24.8279C13.0782 25.5781 12.0608 25.9995 11 25.9995ZM24 20.4995H23C22.7347 20.4995 22.4804 20.6049 22.2929 20.7924C22.1053 20.9799 22 21.2343 22 21.4995C22 21.7647 22.1053 22.0191 22.2929 22.2066C22.4804 22.3942 22.7347 22.4995 23 22.4995H24C24.3266 22.499 24.6528 22.4756 24.9762 22.4295C24.8931 23.1978 24.5893 23.9257 24.1013 24.525C23.6134 25.1243 22.9623 25.5694 22.2268 25.8065C21.4913 26.0437 20.7028 26.0627 19.9567 25.8612C19.2106 25.6598 18.5388 25.2465 18.0226 24.6714C17.5064 24.0963 17.1679 23.3839 17.0479 22.6205C16.9279 21.857 17.0317 21.0752 17.3466 20.3694C17.6615 19.6637 18.1742 19.0643 18.8225 18.6437C19.4709 18.2232 20.2271 17.9994 21 17.9995C21.2652 17.9995 21.5195 17.8942 21.7071 17.7066C21.8946 17.5191 22 17.2647 22 16.9995C22 16.7343 21.8946 16.4799 21.7071 16.2924C21.5195 16.1049 21.2652 15.9995 21 15.9995C19.523 15.9984 18.0981 16.5444 17 17.532V8.99951C17 7.93865 17.4214 6.92123 18.1715 6.17108C18.9217 5.42094 19.9391 4.99951 21 4.99951C22.0608 4.99951 23.0782 5.42094 23.8284 6.17108C24.5785 6.92123 25 7.93865 25 8.99951V9.84076C25 10.0475 25.0641 10.2491 25.1834 10.4178C25.3027 10.5866 25.4714 10.7143 25.6662 10.7833C26.7798 11.1753 27.7187 11.9487 28.3167 12.9666C28.9148 13.9844 29.1334 15.1811 28.9339 16.3446C28.7343 17.5082 28.1295 18.5636 27.2265 19.3241C26.3235 20.0845 25.1805 20.5009 24 20.4995ZM26 13.9995C26 14.2647 25.8946 14.5191 25.7071 14.7066C25.5195 14.8942 25.2652 14.9995 25 14.9995H24.5C23.3065 14.9995 22.1619 14.5254 21.318 13.6815C20.4741 12.8376 20 11.693 20 10.4995V9.99951C20 9.7343 20.1053 9.47994 20.2929 9.29241C20.4804 9.10487 20.7347 8.99951 21 8.99951C21.2652 8.99951 21.5195 9.10487 21.7071 9.29241C21.8946 9.47994 22 9.7343 22 9.99951V10.4995C22 11.1626 22.2634 11.7984 22.7322 12.2673C23.201 12.7361 23.8369 12.9995 24.5 12.9995H25C25.2652 12.9995 25.5195 13.1049 25.7071 13.2924C25.8946 13.4799 26 13.7343 26 13.9995ZM7.49996 14.9995H6.99996C6.73474 14.9995 6.48039 14.8942 6.29285 14.7066C6.10532 14.5191 5.99996 14.2647 5.99996 13.9995C5.99996 13.7343 6.10532 13.4799 6.29285 13.2924C6.48039 13.1049 6.73474 12.9995 6.99996 12.9995H7.49996C8.163 12.9995 8.79889 12.7361 9.26773 12.2673C9.73657 11.7984 9.99996 11.1626 9.99996 10.4995V9.99951C9.99996 9.7343 10.1053 9.47994 10.2929 9.29241C10.4804 9.10487 10.7347 8.99951 11 8.99951C11.2652 8.99951 11.5195 9.10487 11.7071 9.29241C11.8946 9.47994 12 9.7343 12 9.99951V10.4995C12 11.693 11.5259 12.8376 10.6819 13.6815C9.83803 14.5254 8.69344 14.9995 7.49996 14.9995Z"
                  fill="url(#paint0_linear_45_8)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_45_8"
                    x1="15.9995"
                    y1="3.00488"
                    x2="15.9995"
                    y2="27.9941"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#42D392" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <DonutChart percentage={78} size={80} strokeWidth={10} />
            </div>
          </div>
        </div>
      </div>

      {/* Atributos */}
      <div className="mb-4 rounded border border-border">
        <div className="flex p-2 items-center justify-between bg-[#27272a]/20">
          <h3 className="text-2xl flex items-center gap-x-2 font-semibold">
            <span className="bg-border p-2 rounded">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29 26C29 26.2652 28.8946 26.5196 28.7071 26.7071C28.5196 26.8946 28.2652 27 28 27H4C3.73478 27 3.48043 26.8946 3.29289 26.7071C3.10536 26.5196 3 26.2652 3 26V6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5C4.26522 5 4.51957 5.10536 4.70711 5.29289C4.89464 5.48043 5 5.73478 5 6V17.7962L11.3413 12.25C11.5138 12.0989 11.733 12.0118 11.9622 12.0031C12.1914 11.9945 12.4166 12.0649 12.6 12.2025L19.9513 17.7162L27.3412 11.25C27.4381 11.1541 27.5536 11.079 27.6806 11.0293C27.8076 10.9797 27.9434 10.9565 28.0796 10.9613C28.2159 10.9661 28.3497 10.9986 28.4729 11.057C28.5961 11.1154 28.7061 11.1983 28.7961 11.3008C28.8861 11.4032 28.9541 11.523 28.9961 11.6527C29.0381 11.7824 29.0532 11.9193 29.0403 12.055C29.0274 12.1908 28.987 12.3224 28.9213 12.4419C28.8557 12.5615 28.7664 12.6663 28.6588 12.75L20.6588 19.75C20.4862 19.9011 20.267 19.9882 20.0378 19.9969C19.8086 20.0055 19.5834 19.9351 19.4 19.7975L12.0487 14.2863L5 20.4538V25H28C28.2652 25 28.5196 25.1054 28.7071 25.2929C28.8946 25.4804 29 25.7348 29 26Z"
                  fill="url(#paint0_linear_43_2)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_43_2"
                    x1="16.0224"
                    y1="5"
                    x2="16.0224"
                    y2="27"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#42D392" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>{" "}
            </span>
            <span className="background-gradient bg-clip-text text-transparent">
              Attributes
            </span>
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#cccccc80"
            viewBox="0 0 256 256"
            className={`${
              activeItems.includes("attributes") ? "rotate-180" : "rotate-0"
            } transition-all duration-300 ease-in-out cursor-pointer`}
            onClick={() => toggleItem("attributes")}
          >
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </div>
        {activeItems.includes("attributes") && (
          <div className="grid grid-cols-2 gap-4 p-2">
            {Object.entries(attributes).map(([attribute, value]) => (
              <div
                key={attribute}
                className="flex border-b border-l  rounded-bl p-1 border-border justify-between"
              >
                <span className="font-medium capitalize">{attribute}</span>
                <span className="bg-gradient-to-tr from-border to-transparent rounded-full block px-2">
                  {value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Habilidades */}
      <div className="mb-4 rounded border border-border">
        <div className="flex p-2 items-center justify-between bg-[#27272a]/20">
          <h3 className="text-2xl flex items-center gap-x-2 font-semibold">
            <span className="bg-border p-2 rounded">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.6977 16.1325L18.2502 13.75L15.8752 7.2975C15.7346 6.91541 15.4801 6.58566 15.1461 6.35273C14.8122 6.11981 14.4149 5.99492 14.0077 5.99492C13.6005 5.99492 13.2032 6.11981 12.8692 6.35273C12.5353 6.58566 12.2808 6.91541 12.1402 7.2975L9.7502 13.75L3.2977 16.125C2.91561 16.2656 2.58586 16.5201 2.35293 16.854C2.12001 17.188 1.99512 17.5853 1.99512 17.9925C1.99512 18.3997 2.12001 18.797 2.35293 19.131C2.58586 19.4649 2.91561 19.7194 3.2977 19.86L9.7502 22.25L12.1252 28.7025C12.2658 29.0846 12.5203 29.4143 12.8542 29.6473C13.1882 29.8802 13.5855 30.0051 13.9927 30.0051C14.3999 30.0051 14.7972 29.8802 15.1311 29.6473C15.4651 29.4143 15.7196 29.0846 15.8602 28.7025L18.2502 22.25L24.7027 19.875C25.0848 19.7344 25.4145 19.4799 25.6475 19.146C25.8804 18.812 26.0053 18.4147 26.0053 18.0075C26.0053 17.6003 25.8804 17.203 25.6475 16.869C25.4145 16.5351 25.0848 16.2806 24.7027 16.14L24.6977 16.1325ZM17.1252 20.5275C16.9895 20.5775 16.8662 20.6564 16.7639 20.7587C16.6616 20.861 16.5827 20.9843 16.5327 21.12L14.0002 27.9813L11.4727 21.125C11.4228 20.9878 11.3434 20.8633 11.2402 20.76C11.1369 20.6568 11.0124 20.5774 10.8752 20.5275L4.01895 18L10.8752 15.4725C11.0124 15.4226 11.1369 15.3432 11.2402 15.24C11.3434 15.1367 11.4228 15.0122 11.4727 14.875L14.0002 8.01875L16.5277 14.875C16.5777 15.0107 16.6566 15.134 16.7589 15.2363C16.8612 15.3386 16.9845 15.4175 17.1202 15.4675L23.9814 18L17.1252 20.5275ZM18.0002 5C18.0002 4.73478 18.1056 4.48043 18.2931 4.29289C18.4806 4.10536 18.735 4 19.0002 4H21.0002V2C21.0002 1.73478 21.1056 1.48043 21.2931 1.29289C21.4806 1.10536 21.735 1 22.0002 1C22.2654 1 22.5198 1.10536 22.7073 1.29289C22.8948 1.48043 23.0002 1.73478 23.0002 2V4H25.0002C25.2654 4 25.5198 4.10536 25.7073 4.29289C25.8948 4.48043 26.0002 4.73478 26.0002 5C26.0002 5.26522 25.8948 5.51957 25.7073 5.70711C25.5198 5.89464 25.2654 6 25.0002 6H23.0002V8C23.0002 8.26522 22.8948 8.51957 22.7073 8.70711C22.5198 8.89464 22.2654 9 22.0002 9C21.735 9 21.4806 8.89464 21.2931 8.70711C21.1056 8.51957 21.0002 8.26522 21.0002 8V6H19.0002C18.735 6 18.4806 5.89464 18.2931 5.70711C18.1056 5.51957 18.0002 5.26522 18.0002 5ZM31.0002 11C31.0002 11.2652 30.8948 11.5196 30.7073 11.7071C30.5198 11.8946 30.2654 12 30.0002 12H29.0002V13C29.0002 13.2652 28.8948 13.5196 28.7073 13.7071C28.5198 13.8946 28.2654 14 28.0002 14C27.735 14 27.4806 13.8946 27.2931 13.7071C27.1056 13.5196 27.0002 13.2652 27.0002 13V12H26.0002C25.735 12 25.4806 11.8946 25.2931 11.7071C25.1056 11.5196 25.0002 11.2652 25.0002 11C25.0002 10.7348 25.1056 10.4804 25.2931 10.2929C25.4806 10.1054 25.735 10 26.0002 10H27.0002V9C27.0002 8.73478 27.1056 8.48043 27.2931 8.29289C27.4806 8.10536 27.735 8 28.0002 8C28.2654 8 28.5198 8.10536 28.7073 8.29289C28.8948 8.48043 29.0002 8.73478 29.0002 9V10H30.0002C30.2654 10 30.5198 10.1054 30.7073 10.2929C30.8948 10.4804 31.0002 10.7348 31.0002 11Z"
                  fill="url(#paint0_linear_58_8)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_58_8"
                    x1="16.4977"
                    y1="1"
                    x2="16.4977"
                    y2="30.0051"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#42D392" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="background-gradient bg-clip-text text-transparent">
              Skills
            </span>
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#cccccc80"
            viewBox="0 0 256 256"
            className={`${
              activeItems.includes("skills") ? "rotate-180" : "rotate-0"
            } transition-all duration-300 ease-in-out cursor-pointer`}
            onClick={() => toggleItem("skills")}
          >
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </div>
        {activeItems.includes("skills") && (
          <div className="grid grid-cols-2 gap-4 p-2">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="space-y-1 border-b border-l rounded-bl p-1 border-border"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="bg-gradient-to-tr from-border to-transparent rounded-full  block px-2">
                    {typeof skill.value === "string"
                      ? skill.value
                      : `${skill.value}%`}
                  </span>
                </div>
                {typeof skill.value === "number" && (
                  <div className="w-full bg-border overflow-hidden h-3 rounded-full">
                    <div
                      className="h-full background-gradient"
                      style={{ width: `${skill.value}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Combate */}
      <div className="mb-4 rounded border border-border">
        <div className="flex p-2 items-center justify-between bg-[#27272a]/20">
          <h3 className="text-2xl flex items-center gap-x-2 font-semibold">
            <span className="bg-border p-2 rounded">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 2H15C13.1441 2.00199 11.3648 2.74012 10.0524 4.05245C8.74012 5.36477 8.00199 7.14409 8 9H7C5.93913 9 4.92172 9.42143 4.17157 10.1716C3.42143 10.9217 3 11.9391 3 13V16.6488C3.00089 17.103 3.15553 17.5436 3.43875 17.8988C3.46289 17.929 3.48877 17.9578 3.51625 17.985L8 22.4175V27C8 27.5304 8.21071 28.0391 8.58579 28.4142C8.96086 28.7893 9.46957 29 10 29H24C24.5304 29 25.0391 28.7893 25.4142 28.4142C25.7893 28.0391 26 27.5304 26 27V22.14L27.9225 15.4087C27.9739 15.2304 27.9999 15.0456 28 14.86V9C27.998 7.14409 27.2599 5.36477 25.9476 4.05245C24.6352 2.74012 22.8559 2.00199 21 2ZM26 14.86L24.0387 21.725C24.0129 21.8144 23.9998 21.907 24 22V27H10V22C9.99994 21.8677 9.97362 21.7366 9.92255 21.6146C9.87148 21.4925 9.79669 21.3817 9.7025 21.2887L5 16.64V13C5 12.4696 5.21071 11.9609 5.58579 11.5858C5.96086 11.2107 6.46957 11 7 11H8V13C8 13.2652 8.10536 13.5196 8.29289 13.7071C8.48043 13.8946 8.73478 14 9 14C9.26522 14 9.51957 13.8946 9.70711 13.7071C9.89464 13.5196 10 13.2652 10 13V9C10 7.67392 10.5268 6.40215 11.4645 5.46447C12.4021 4.52678 13.6739 4 15 4H21C22.3261 4 23.5979 4.52678 24.5355 5.46447C25.4732 6.40215 26 7.67392 26 9V14.86ZM21.4475 20.895L19.2362 22L21.4475 23.105C21.6849 23.2237 21.8654 23.4318 21.9493 23.6836C22.0332 23.9353 22.0137 24.2101 21.895 24.4475C21.7763 24.6849 21.5682 24.8654 21.3164 24.9493C21.0647 25.0332 20.7899 25.0137 20.5525 24.895L17 23.1175L13.4475 24.895C13.33 24.9538 13.202 24.9888 13.0709 24.9981C12.9399 25.0074 12.8082 24.9908 12.6836 24.9493C12.5589 24.9077 12.4436 24.842 12.3444 24.7559C12.2451 24.6698 12.1638 24.565 12.105 24.4475C12.0462 24.33 12.0112 24.202 12.0019 24.0709C11.9926 23.9399 12.0092 23.8082 12.0507 23.6836C12.0923 23.5589 12.158 23.4437 12.2441 23.3444C12.3302 23.2451 12.435 23.1638 12.5525 23.105L14.7638 22L12.5525 20.895C12.435 20.8362 12.3302 20.7549 12.2441 20.6556C12.158 20.5563 12.0923 20.4411 12.0507 20.3164C12.0092 20.1918 11.9926 20.0601 12.0019 19.9291C12.0112 19.798 12.0462 19.67 12.105 19.5525C12.1638 19.435 12.2451 19.3302 12.3444 19.2441C12.4436 19.158 12.5589 19.0923 12.6836 19.0507C12.9353 18.9668 13.2101 18.9863 13.4475 19.105L17 20.8825L20.5525 19.105C20.67 19.0462 20.798 19.0112 20.9291 19.0019C21.0601 18.9926 21.1918 19.0092 21.3164 19.0507C21.4411 19.0923 21.5563 19.158 21.6556 19.2441C21.7549 19.3302 21.8362 19.435 21.895 19.5525C21.9538 19.67 21.9888 19.798 21.9981 19.9291C22.0074 20.0601 21.9908 20.1918 21.9493 20.3164C21.9077 20.4411 21.842 20.5563 21.7559 20.6556C21.6698 20.7549 21.565 20.8362 21.4475 20.895Z"
                  fill="url(#paint0_linear_44_5)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_44_5"
                    x1="15.5"
                    y1="2"
                    x2="15.5"
                    y2="29"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#42D392" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="background-gradient bg-clip-text text-transparent">
              Combat
            </span>
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#cccccc80"
            viewBox="0 0 256 256"
            className={`${
              activeItems.includes("combat") ? "rotate-180" : "rotate-0"
            } transition-all duration-300 ease-in-out cursor-pointer`}
            onClick={() => toggleItem("combat")}
          >
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </div>
        {/* {activeItems.includes("inventory") && (
          <ul className="list-disc flex flex-col gap-y-2 p-2">
            <li className="bg-gradient-to-tr from-border to-transparent rounded-full block w-fit px-2">
              Revólver
            </li>
            <li className="bg-gradient-to-tr from-border to-transparent rounded-full block w-fit px-2">
              Lanterna
            </li>
            <li className="bg-gradient-to-tr from-border to-transparent rounded-full block w-fit px-2">
              Kit de primeiros socorros
            </li>
          </ul>
        )} */}
      </div>

      {/* Inventário */}
      <div className="mb-4 rounded border border-border">
        <div className="flex p-2 items-center justify-between bg-[#27272a]/20">
          <h3 className="text-2xl flex items-center gap-x-2 font-semibold">
            <span className="bg-border p-2 rounded">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 5.0725V4C21 3.20435 20.6839 2.44129 20.1213 1.87868C19.5587 1.31607 18.7956 1 18 1H14C13.2044 1 12.4413 1.31607 11.8787 1.87868C11.3161 2.44129 11 3.20435 11 4V5.0725C9.3351 5.31517 7.81298 6.14844 6.71147 7.42023C5.60995 8.69202 5.00251 10.3175 5 12V27C5 27.5304 5.21071 28.0391 5.58579 28.4142C5.96086 28.7893 6.46957 29 7 29H25C25.5304 29 26.0391 28.7893 26.4142 28.4142C26.7893 28.0391 27 27.5304 27 27V12C26.9975 10.3175 26.39 8.69202 25.2885 7.42023C24.187 6.14844 22.6649 5.31517 21 5.0725ZM14 3H18C18.2652 3 18.5196 3.10536 18.7071 3.29289C18.8946 3.48043 19 3.73478 19 4V5H13V4C13 3.73478 13.1054 3.48043 13.2929 3.29289C13.4804 3.10536 13.7348 3 14 3ZM21 20H11V19C11 18.7348 11.1054 18.4804 11.2929 18.2929C11.4804 18.1054 11.7348 18 12 18H20C20.2652 18 20.5196 18.1054 20.7071 18.2929C20.8946 18.4804 21 18.7348 21 19V20ZM11 22H17V23C17 23.2652 17.1054 23.5196 17.2929 23.7071C17.4804 23.8946 17.7348 24 18 24C18.2652 24 18.5196 23.8946 18.7071 23.7071C18.8946 23.5196 19 23.2652 19 23V22H21V27H11V22ZM25 27H23V19C23 18.2044 22.6839 17.4413 22.1213 16.8787C21.5587 16.3161 20.7956 16 20 16H12C11.2044 16 10.4413 16.3161 9.87868 16.8787C9.31607 17.4413 9 18.2044 9 19V27H7V12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7H20C21.3261 7 22.5979 7.52678 23.5355 8.46447C24.4732 9.40215 25 10.6739 25 12V27ZM19 11C19 11.2652 18.8946 11.5196 18.7071 11.7071C18.5196 11.8946 18.2652 12 18 12H14C13.7348 12 13.4804 11.8946 13.2929 11.7071C13.1054 11.5196 13 11.2652 13 11C13 10.7348 13.1054 10.4804 13.2929 10.2929C13.4804 10.1054 13.7348 10 14 10H18C18.2652 10 18.5196 10.1054 18.7071 10.2929C18.8946 10.4804 19 10.7348 19 11Z"
                  fill="url(#paint0_linear_52_2)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_52_2"
                    x1="16"
                    y1="1"
                    x2="16"
                    y2="29"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#42D392" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="background-gradient bg-clip-text text-transparent">
              Inventory
            </span>
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#cccccc80"
            viewBox="0 0 256 256"
            className={`${
              activeItems.includes("inventory") ? "rotate-180" : "rotate-0"
            } transition-all duration-300 ease-in-out cursor-pointer`}
            onClick={() => toggleItem("inventory")}
          >
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </div>
        {activeItems.includes("inventory") && (
          <ul className="list-disc flex flex-col gap-y-2 p-2">
            <li className="bg-gradient-to-tr from-border to-transparent rounded-full block w-fit px-2">
              Revólver
            </li>
            <li className="bg-gradient-to-tr from-border to-transparent rounded-full block w-fit px-2">
              Lanterna
            </li>
            <li className="bg-gradient-to-tr from-border to-transparent rounded-full block w-fit px-2">
              Kit de primeiros socorros
            </li>
          </ul>
        )}
      </div>

      {/* História de fundo */}
      <div className="mb-4 rounded border border-border">
        <div className="flex p-2 items-center justify-between bg-[#27272a]/20">
          <h3 className="text-2xl flex items-center gap-x-2 font-semibold">
            <span className="bg-border p-2 rounded">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.9562 24.3187L24.8075 4.59366C24.7538 4.33572 24.6497 4.09091 24.5012 3.87331C24.3526 3.65572 24.1626 3.46962 23.9419 3.3257C23.7212 3.18179 23.4742 3.0829 23.2152 3.03471C22.9562 2.98652 22.6902 2.98999 22.4325 3.04491L16.5812 4.30241C16.0637 4.41574 15.6118 4.72883 15.3239 5.17359C15.036 5.61836 14.9353 6.15881 15.0437 6.67741L19.1925 26.4024C19.285 26.8524 19.5295 27.2569 19.8851 27.5478C20.2407 27.8388 20.6856 27.9984 21.145 27.9999C21.287 27.9997 21.4286 27.9846 21.5675 27.9549L27.4188 26.6974C27.9369 26.5838 28.3893 26.2701 28.6772 25.8246C28.9652 25.379 29.0655 24.8378 28.9562 24.3187ZM17 6.26866C17 6.26116 17 6.25741 17 6.25741L22.85 5.00741L23.2663 6.99116L17.4163 8.24991L17 6.26866ZM17.8275 10.2024L23.68 8.94616L24.0975 10.9337L18.25 12.1912L17.8275 10.2024ZM18.6575 14.1487L24.51 12.8912L26.1725 20.7962L20.32 22.0537L18.6575 14.1487ZM27 24.7424L21.15 25.9924L20.7337 24.0087L26.5837 22.7499L27 24.7312C27 24.7387 27 24.7424 27 24.7424ZM13 3.99991H7C6.46957 3.99991 5.96086 4.21063 5.58579 4.5857C5.21071 4.96077 5 5.46948 5 5.99991V25.9999C5 26.5303 5.21071 27.0391 5.58579 27.4141C5.96086 27.7892 6.46957 27.9999 7 27.9999H13C13.5304 27.9999 14.0391 27.7892 14.4142 27.4141C14.7893 27.0391 15 26.5303 15 25.9999V5.99991C15 5.46948 14.7893 4.96077 14.4142 4.5857C14.0391 4.21063 13.5304 3.99991 13 3.99991ZM7 5.99991H13V7.99991H7V5.99991ZM7 9.99991H13V21.9999H7V9.99991ZM13 25.9999H7V23.9999H13V25.9999Z"
                  fill="url(#paint0_linear_59_11)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_59_11"
                    x1="16.9997"
                    y1="3.00098"
                    x2="16.9997"
                    y2="27.9999"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#42D392" />
                    <stop offset="1" stop-color="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="background-gradient bg-clip-text text-transparent">
              Backstory
            </span>
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#cccccc80"
            viewBox="0 0 256 256"
            className={`${
              activeItems.includes("backstory") ? "rotate-180" : "rotate-0"
            } transition-all duration-300 ease-in-out cursor-pointer`}
            onClick={() => toggleItem("backstory")}
          >
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </div>
        {/* {activeItems.includes("inventory") && (
          <ul className="list-disc flex flex-col gap-y-2 p-2">
            <li className="bg-gradient-to-tr from-border to-transparent rounded-full block w-fit px-2">
              Revólver
            </li>
            <li className="bg-gradient-to-tr from-border to-transparent rounded-full block w-fit px-2">
              Lanterna
            </li>
            <li className="bg-gradient-to-tr from-border to-transparent rounded-full block w-fit px-2">
              Kit de primeiros socorros
            </li>
          </ul>
        )} */}
      </div>

      {/* Notas e Observações */}
      <div className="mb-4 rounded border border-border">
        <div className="flex p-2 items-center justify-between bg-[#27272a]/20">
          <h3 className="text-2xl flex items-center gap-x-2 font-semibold">
            <span className="bg-border p-2 rounded">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11H20C20.2652 11 20.5196 11.1054 20.7071 11.2929C20.8946 11.4804 21 11.7348 21 12C21 12.2652 20.8946 12.5196 20.7071 12.7071C20.5196 12.8946 20.2652 13 20 13H12C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12ZM12 17H20C20.2652 17 20.5196 16.8946 20.7071 16.7071C20.8946 16.5196 21 16.2652 21 16C21 15.7348 20.8946 15.4804 20.7071 15.2929C20.5196 15.1054 20.2652 15 20 15H12C11.7348 15 11.4804 15.1054 11.2929 15.2929C11.1054 15.4804 11 15.7348 11 16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17ZM16 19H12C11.7348 19 11.4804 19.1054 11.2929 19.2929C11.1054 19.4804 11 19.7348 11 20C11 20.2652 11.1054 20.5196 11.2929 20.7071C11.4804 20.8946 11.7348 21 12 21H16C16.2652 21 16.5196 20.8946 16.7071 20.7071C16.8946 20.5196 17 20.2652 17 20C17 19.7348 16.8946 19.4804 16.7071 19.2929C16.5196 19.1054 16.2652 19 16 19ZM28 6V19.5863C28.0008 19.849 27.9494 20.1093 27.8488 20.352C27.7482 20.5947 27.6003 20.815 27.4137 21L21 27.4137C20.815 27.6003 20.5947 27.7482 20.352 27.8488C20.1093 27.9494 19.849 28.0008 19.5863 28H6C5.46957 28 4.96086 27.7893 4.58579 27.4142C4.21071 27.0391 4 26.5304 4 26V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H26C26.5304 4 27.0391 4.21071 27.4142 4.58579C27.7893 4.96086 28 5.46957 28 6ZM6 26H19V20C19 19.7348 19.1054 19.4804 19.2929 19.2929C19.4804 19.1054 19.7348 19 20 19H26V6H6V26ZM21 21V24.5875L24.5863 21H21Z"
                  fill="url(#paint0_linear_53_5)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_53_5"
                    x1="16"
                    y1="4"
                    x2="16"
                    y2="28"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#42D392" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="background-gradient bg-clip-text text-transparent">
              Notes
            </span>
          </h3>
        </div>
        <div className="p-2">
          <textarea
            className="w-full h-32 bg-border p-2 outline-none resize-none rounded"
            placeholder="Write your notes here..."
          />
        </div>
      </div>
    </section>
  )
}

interface DonutChartProps {
  percentage: number // Porcentagem do progresso
  size?: number // Tamanho do gráfico (largura e altura)
  strokeWidth?: number // Largura do traço
}

export const DonutChart: React.FC<DonutChartProps> = ({
  percentage,
  size = 100,
  strokeWidth = 10,
}) => {
  const radius = (size - strokeWidth) / 2 // Raio interno
  const circumference = 2 * Math.PI * radius // Circunferência do círculo
  const progress = (percentage / 100) * circumference // Progresso baseado na porcentagem

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        style={{ overflow: "visible" }}
      >
        {/* Fundo do círculo */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#27272a90"
          strokeWidth={strokeWidth}
        />
        {/* Progresso */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)" // Usando gradiente para a cor
          strokeWidth={strokeWidth}
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#42D392" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
