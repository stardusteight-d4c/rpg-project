export const weapons: Array<IWeapons> = [
  {
    name: "Morgenstern",
    iconUrl: "/weapons/morgenstern.svg",
    skill: "Fighting(Brawl)",
    range: "2m",
    damage: "1d20 + STR",
    attacks: "1",
    description:
      "The Morgenstern, also known as the morning star, is a blunt weapon with a spiked (or pointed) head attached to a shaft. It was designed to deal severe damage with crushing blows and can penetrate weaker armors.",
    properties: [
      "Ideal for blunt attacks that cause damage to denser areas, such as heavy armor.",
      "Chance to deal additional damage when attacking targets with weaker armor.",
    ],
  },
  {
    name: "Scimitar",
    iconUrl: "/weapons/scimitar.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d12 + DEX",
    attacks: "1(2)",
    description:
      "The Scimitar is a curved-blade sword designed for quick, fluid strikes. Its construction allows for precise, high-speed cuts, making it ideal for agile combat. Its shape makes it effective for fast, precise attacks, but with a limited range at close distances.",
    properties: [
      "Light and agile, it can be used for quick attacks, offering an advantage in dodging.",
      "Allows finesse attacks, enabling the character to use Dexterity instead of Strength.",
    ],
  },
  {
    name: "Kriegsbeil",
    iconUrl: "/weapons/kriegsbeil.svg",
    skill: "Fighting(Brawl)",
    range: "2m",
    damage: "1d20 + STR",
    attacks: "1",
    description:
      "The Kriegsbeil is a war axe of Germanic origin, commonly associated with heavy blades and a robust shaft. This weapon was designed for powerful strikes, capable of breaking through armor or dealing significant damage, but is generally limited to close combat.",
    properties: [
      "Has a chance to knock down or disarm the opponent.",
      "Heavy and requires the use of both hands to maximize its impact.",
    ],
  },
  {
    name: "Speer",
    iconUrl: "/weapons/speer.svg",
    skill: "Fighting(Brawl)",
    range: "3m",
    damage: "1d12 + STR",
    attacks: "1(2)",
    description:
      "The Speer is a long spear designed for thrusting attacks at medium range. Its length allows for effective strikes from a distance while keeping the user at a safe range from their opponent. Often used in formations or to hold off enemies at bay.",
    properties: [
      "Ideal for thrusting attacks, giving the user an advantage in reach over close-range weapons.",
      "Can be used for defensive stances, providing additional protection against attacks from multiple enemies.",
    ],
  },
  {
    name: "Zweililien",
    iconUrl: "/weapons/zweililien.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d12 + STR",
    attacks: "1(2)",
    description:
      "The Zweililien is a double-headed axe, typically featuring a heavy, symmetrical design meant for powerful swings. It excels in cleaving and crushing attacks, capable of delivering devastating blows in close combat. However, its weight makes it slower and less agile.",
    properties: [
      "Heavy and powerful, great for delivering devastating strikes.",
      "Can deal increased damage with wide swings, but at the cost of speed and precision.",
    ],
  },
  {
    name: "Basiliskanzunge",
    iconUrl: "/weapons/basiliskanzunge.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d12 + DEX",
    attacks: "1(4)",
    description:
      "The Basiliskanzunge is a rare and unique weapon, resembling a serpent’s tongue. It’s a short, flexible blade that can be used for both slashing and thrusting, often employed for precise, agile attacks in close quarters.",
    properties: [
      "Flexible and quick, ideal for swift slashes and thrusts in close-quarters combat.",
      "Can strike with finesse, allowing the user to rely on Dexterity for attack rolls instead of Strength.",
    ],
  },
  {
    name: "Hellebarde",
    iconUrl: "/weapons/hellebarde.svg",
    skill: "Fighting(Brawl)",
    range: "3m",
    damage: "1d20 + STR",
    attacks: "1",
    description:
      "The Hellebarde is a polearm combining a spear and an axe, with a long reach and a versatile design. It was used for both thrusting and slashing attacks, as well as for sweeping blows. Its length allows the user to strike from a distance, keeping enemies at bay and providing greater control in combat.",
    properties: [
      "Great for maintaining distance, providing reach over shorter weapons.",
      "Can perform both slashing and thrusting attacks, making it versatile in combat.",
      "Can be used to trip or disarm opponents with proper technique.",
    ],
  },
  {
    name: "Sword",
    iconUrl: "/weapons/sword.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d12 + DEX",
    attacks: "1(3)",
    description:
      "The Sword is a classic weapon with a straight, double-edged blade designed for cutting and thrusting. It's well-balanced, effective in both offensive and defensive maneuvers, and can be used for precise attacks. A standard weapon for many warriors, it is highly versatile in close combat.",
    properties: [
      "Balanced and versatile, useful for both slashing and thrusting.",
      "Can be used for parrying attacks, providing defense and counterattacks.",
      "A common weapon for various fighting styles, offering flexibility in combat.",
    ],
  },
  {
    name: "Bastardschwert Type 03",
    iconUrl: "/weapons/bastardschwert-type-03.svg",
    skill: "Fighting(Brawl)",
    range: "1(2)m",
    damage: "1d20 + STR",
    attacks: "1(2)",
    description:
      "The Bastardschwert Type 03, also known as the bastard sword, is a hybrid weapon designed to be wielded with one or two hands. It combines the reach of a longsword with the cutting power of a broad sword, making it highly adaptable in combat. Its versatility allows the user to switch between one-handed and two-handed use depending on the situation.",
    properties: [
      "Versatile weapon that can be wielded with one or two hands, allowing for flexible combat styles.",
      "Provides increased damage and reach when wielded with two hands.",
      "Ideal for both defensive and offensive maneuvers, balancing speed and power.",
    ],
  },
  {
    name: "Barbaren Axe",
    iconUrl: "/weapons/barbaren-axe.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d20 + STR",
    attacks: "1",
    description:
      "The Barbaren Axe is a large, brutal axe favored by barbarians for its raw destructive power. Its heavy blade is designed for devastating cleaving strikes, capable of splitting shields and cutting through armor. While powerful, it requires significant strength to wield effectively.",
    properties: [
      "Delivers powerful cleaving strikes that can deal massive damage.",
      "Heavy and requires both hands for effective use.",
      "May cause knockback or stagger effects on successful hits.",
    ],
  },
  {
    name: "Bolo",
    iconUrl: "/weapons/bolo.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d12 + DEX",
    attacks: "1(3)",
    description:
      "The Bolo is a machete-like weapon commonly used for cutting through dense vegetation or as a tool in survival situations. Its weighted blade allows for powerful chopping strikes, making it effective in combat for quick, decisive blows.",
    properties: [
      "Weighted blade enhances chopping power.",
      "Can be used for swift, decisive slashes.",
      "Versatile tool that doubles as a weapon and utility blade.",
    ],
  },
  {
    name: "Kukri",
    iconUrl: "/weapons/kukri.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "2d12 + DEX",
    attacks: "1(2)",
    description:
      "The Kukri is a short, inwardly curved blade with origins in Nepal, known for its ability to deliver powerful slashes and precise cuts. Its unique shape makes it effective for close combat, allowing for deep, cutting strikes and exceptional control.",
    properties: [
      "Curved blade enables powerful slashing and cutting attacks.",
      "Compact and versatile, suitable for close-quarters combat.",
      "Effective for both combat and utility purposes.",
    ],
  },
  {
    name: "Golok",
    iconUrl: "/weapons/golok.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d12 + STR",
    attacks: "1(2)",
    description:
      "The Golok is a short, heavy blade commonly used for agricultural tasks and combat. Its design allows for powerful chopping and slashing strikes, making it an effective tool for close-quarters combat and clearing obstacles.",
    properties: [
      "Weighted for powerful chopping attacks.",
      "Compact and easy to maneuver in close combat.",
    ],
  },
  {
    name: "Parang",
    iconUrl: "/weapons/parang.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d12 + STR",
    attacks: "1(2)",
    description:
      "The Parang is a traditional blade with a curved design, used for cutting and chopping. Its shape provides excellent control and effectiveness in delivering slashes, making it a versatile weapon for combat and survival.",
    properties: [
      "Curved blade for effective slashing attacks.",
      "Can double as a utility tool in wilderness settings.",
    ],
  },
  {
    name: "Panga",
    iconUrl: "/weapons/panga.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d12 + STR",
    attacks: "1(2)",
    description:
      "The Panga is a heavy, machete-like blade known for its effectiveness in cutting through tough materials. It is well-suited for combat, offering devastating slashes and precise cuts in close quarters.",
    properties: [
      "Designed for cutting through tough materials with ease.",
      "Heavy blade delivers powerful, decisive slashes.",
    ],
  },
  {
    name: "Bowie",
    iconUrl: "/weapons/bowie.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d12 + STR",
    attacks: "1(2)",
    description:
      "The Bowie knife is a large, versatile blade designed for combat and survival. Known for its sharp edge and durable design, it is capable of powerful slashes and precise thrusts, making it effective in close-quarters combat.",
    properties: [
      "Sharp edge for effective slashing attacks.",
      "Compact and versatile, suitable for combat and utility purposes.",
    ],
  },
  {
    name: "Cane",
    iconUrl: "/weapons/cane.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d12 + STR",
    attacks: "1(2)",
    description:
      "The Cane is a walking stick that can double as a blunt weapon. While not designed specifically for combat, it can deliver effective strikes when used with skill and precision.",
    properties: [
      "Lightweight and easy to maneuver.",
      "Blunt weapon, ideal for non-lethal attacks.",
    ],
  },
  {
    name: "Heavy",
    iconUrl: "/weapons/heavy.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d20 + STR",
    attacks: "1",
    description:
      "The Heavy weapon category includes large, powerful weapons designed for maximum impact. These are typically slower but deal significant damage in a single strike.",
    properties: [
      "High damage output in a single strike.",
      "Heavy and requires significant Strength to wield effectively.",
    ],
  },
  {
    name: "Billhook",
    iconUrl: "/weapons/billhook.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d12 + STR",
    attacks: "1(2)",
    description:
      "The Billhook is a curved blade attached to a long handle, traditionally used for cutting vegetation. In combat, it excels at slashing and hooking strikes, allowing the user to control or disarm opponents.",
    properties: [
      "Curved blade for slashing and hooking attacks.",
      "Can be used to control or disarm opponents.",
    ],
  },
  {
    name: "Tapanga",
    iconUrl: "/weapons/tapanga.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d12 + STR",
    attacks: "1(2)",
    description:
      "The Tapanga is a machete-like weapon with a heavy, weighted blade. Its design allows for powerful chopping and slashing strikes, making it effective for clearing obstacles or engaging in close combat.",
    properties: [
      "Weighted blade for powerful chopping strikes.",
      "Durable and versatile, effective for combat and utility purposes.",
    ],
  },
  {
    name: "War Hammer Type 01",
    iconUrl: "/weapons/war-hammer-type-01.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d20 + STR",
    attacks: "1",
    description:
      "The War Hammer Type 01 is a heavy, blunt weapon designed for delivering devastating crushing blows. Its compact design makes it effective in close-quarters combat, capable of breaking through armor and causing significant damage to heavily armored foes.",
    properties: [
      "Effective against heavily armored opponents.",
      "Compact size allows for precise, powerful strikes.",
    ],
  },
  {
    name: "War Hammer Type 02",
    iconUrl: "/weapons/war-hammer-type-02.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d12 + STR",
    attacks: "1(2)",
    description:
      "The War Hammer Type 02 is a balanced weapon combining a blunt head and a spiked opposite side, allowing for both crushing and piercing attacks. It provides versatility in combat, making it effective against a variety of enemies.",
    properties: [
      "Dual-purpose design for crushing and piercing strikes.",
      "Balanced weight for improved attack speed and control.",
    ],
  },
  {
    name: "War Hammer Type 03",
    iconUrl: "/weapons/war-hammer-type-03.svg",
    skill: "Fighting(Brawl)",
    range: "2m",
    damage: "1d20 + STR",
    attacks: "1",
    description:
      "The War Hammer Type 03 features a long handle and a reinforced head, providing additional reach and impact. This weapon is ideal for delivering devastating blows while maintaining a safe distance from the opponent.",
    properties: [
      "Extended reach for safer combat engagements.",
      "Heavy head maximizes impact and damage.",
    ],
  },
  {
    name: "Flail Weapon",
    iconUrl: "/weapons/flail-weapon.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d12 + STR",
    attacks: "1(2)",
    description:
      "The Flail is a spiked weapon attached to a chain or rope. It is designed for delivering powerful, unpredictable blows. Its flailing head can bypass shields or armor, making it particularly effective in close combat.",
    properties: [
      "The chain allows for wide, unpredictable swings.",
      "Can bypass certain types of armor, making it effective against heavily armored foes.",
    ],
  },
  {
    name: "Club Weapon Type 01",
    iconUrl: "/weapons/club-weapon-type-01.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d8 + STR",
    attacks: "1(2)",
    description:
      "The Club Weapon Type 01 is a simple, blunt weapon designed for crushing blows. Its heavy, solid head delivers powerful strikes, making it an effective tool for breaking bones and armor. Easy to wield but lacks versatility.",
    properties: [
      "Ideal for simple, powerful attacks with moderate reach.",
      "Can be used to break bones or disarm opponents with brute force.",
    ],
  },
  {
    name: "Club Weapon Type 02",
    iconUrl: "/weapons/club-weapon-type-02.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d10 + STR",
    attacks: "1",
    description:
      "The Club Weapon Type 02 is a larger, heavier club with a wider head, designed for delivering crushing, devastating blows. Its size allows it to deal more damage, but it sacrifices speed and precision.",
    properties: [
      "Heavy and powerful, effective for delivering devastating strikes.",
      "Slower attacks, but higher damage potential than lighter weapons.",
    ],
  },
  {
    name: "Nunchaku",
    iconUrl: "/weapons/nunchaku.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d6 + DEX",
    attacks: "1(3)",
    description:
      "Nunchaku consists of two sticks connected by a chain or rope, typically used for rapid strikes and fluid movement. Its speed allows the wielder to perform multiple strikes in quick succession, ideal for disarming or incapacitating foes.",
    properties: [
      "High speed and agility, ideal for rapid attacks.",
      "Allows for finesse-based attacks, using Dexterity instead of Strength.",
      "Can be used to entangle or disarm opponents with proper technique.",
    ],
  },
]

// {
//   name: "Basiliskanzunge",
//   iconUrl: "/weapons/basiliskanzunge.svg",
//   skill: "Fighting(Brawl)",
//   range: "",
//   damage: "",
//   attacks: "",
//   description: "",
//   properties: [""],
// },

//
//
//
//
//
