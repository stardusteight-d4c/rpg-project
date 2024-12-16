"use client"
import React, { useState } from "react"

export const CallOfCthulhu = () => {
  const [activeItems, setActiveItems] = useState<
    Array<"attributes" | "skills" | "sanity" | null>
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
    player: "Gabriel Sena",
    age: 42,
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

  function toggleItem(item: "attributes" | "skills" | "sanity") {
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
          className="w-[200px] border border-border h-[200px] object-cover rounded "
        />
        <div className="w-full px-4">
          <span className="block text-3xl font-bold background-gradient bg-clip-text text-transparent tracking-wider">
            Erwin Farwell
          </span>
          <p className="text-sm text-gray-400">
            Investigator in Call of Cthulhu
          </p>
          <div className="mt-2">
            <div className="grid grid-cols-2 gap-4 mt-2">
              {Object.entries(infos).map(([info, value]) => (
                <div
                  key={info}
                  className="flex border-b border-l  rounded-bl p-1 border-border justify-between"
                >
                  <span className="font-medium capitalize">{info}</span>
                  <span className="bg-gradient-to-tr from-border/50 to-transparent rounded-full block px-2">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex flex-col w-full items-center gap-y-2">
              <div className="w-full">
                <div className="flex  justify-between">
                  <span className="font-medium">Hit Points (HP)</span>
                  <span>80%</span>{" "}
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
                  <span className="font-medium">Magic Points (MP)</span>
                  <span>80%</span>{" "}
                </div>
                <div className="w-full bg-border overflow-hidden h-3 rounded-full">
                  <div
                    className="h-full bg-gradient-to-tr from-blue-500 to-blue-400"
                    style={{ width: "28%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Atributos */}
      <div
        onClick={() => toggleItem("attributes")}
        className="mb-4 cursor-pointer rounded p-2 border border-border bg-border/20"
      >
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
                  <stop offset="1" stop-color="#6088F3" />
                </linearGradient>
              </defs>
            </svg>{" "}
          </span>
          <span className="background-gradient bg-clip-text text-transparent">
            Attributes
          </span>
        </h3>
        {activeItems.includes("attributes") && (
          <div className="grid grid-cols-2 gap-4 mt-2">
            {Object.entries(attributes).map(([attribute, value]) => (
              <div
                key={attribute}
                className="flex border-b border-l  rounded-bl p-1 border-border justify-between"
              >
                <span className="font-medium capitalize">{attribute}</span>
                <span className="bg-gradient-to-tr from-border/50 to-transparent rounded-full block px-2">
                  {value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Habilidades */}
      <div
        onClick={() => toggleItem("skills")}
        className="mb-4 cursor-pointer rounded p-2 border border-border bg-border/20"
      >
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
                  <stop stop-color="#42D392" />
                  <stop offset="1" stop-color="#6088F3" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="background-gradient bg-clip-text text-transparent">
            Skills
          </span>
        </h3>
        {activeItems.includes("skills") && (
          <div className="grid grid-cols-2 gap-4 mt-2">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="space-y-1 border-b border-l rounded-bl p-1 border-border"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="bg-gradient-to-tr from-border/50 to-transparent rounded-full  block px-2">
                    {typeof skill.value === "string"
                      ? skill.value
                      : `${skill.value}%`}
                  </span>
                </div>
                {/* Barra de progresso representando a habilidade */}
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

      {/* Sanidade */}
      <div
        onClick={() => toggleItem("sanity")}
        className="mb-4 cursor-pointer rounded p-2 border border-border bg-border/20"
      >
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
                  <stop stop-color="#42D392" />
                  <stop offset="1" stop-color="#6088F3" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="background-gradient bg-clip-text text-transparent">
            Sanity
          </span>
        </h3>
        {activeItems.includes("sanity") && (
          <div className="mt-2">
            <div className="flex justify-between">
              <span className="font-medium">Sanidade Atual</span>
              <span>80%</span>{" "}
            </div>
            <div className="w-full bg-border overflow-hidden h-3 rounded-full">
              <div
                className="h-full background-gradient"
                style={{ width: "80%" }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Equipamentos */}
      <div className="mb-4 rounded p-2 border border-border bg-border/20">
        <h3 className="text-2xl font-semibold mb-2 background-gradient bg-clip-text text-transparent">
          Equipamentos
        </h3>
        <ul className="list-disc pl-6">
          <li>Revólver</li>
          <li>Lanterna</li>
          <li>Kit de primeiros socorros</li>
        </ul>
      </div>

      {/* Notas e Observações */}
      <div className="mb-4 rounded p-2 border border-border bg-border/20">
        <h3 className="text-2xl font-semibold mb-2 background-gradient bg-clip-text text-transparent">
          Notas e Observações
        </h3>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded"
          placeholder="Escreva suas notas aqui..."
        />
      </div>
    </section>
  )
}
