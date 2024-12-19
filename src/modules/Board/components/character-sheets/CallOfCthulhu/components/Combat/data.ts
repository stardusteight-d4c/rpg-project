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
  {
    name: "Bat",
    iconUrl: "/weapons/bat.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d6 + STR",
    attacks: "1(2)",
    description:
      "The Bat is a simple and sturdy blunt weapon, often used for striking with force. Its light weight allows for quick swings, but it lacks the stopping power of heavier weapons.",
    properties: [
      "Light and quick, making it effective for rapid strikes.",
      "Can be used to knock enemies back or knock them unconscious with non-lethal damage.",
    ],
  },
  {
    name: "Baseball Bat",
    iconUrl: "/weapons/baseball-bat.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d8 + STR",
    attacks: "1(2)",
    description:
      "The Baseball Bat is a popular blunt weapon, often used in street combat. Its longer length and heavier weight compared to a regular bat allow for more powerful strikes, ideal for breaking bones or causing significant damage.",
    properties: [
      "Longer reach than a regular bat, ideal for keeping enemies at a distance.",
      "Heavy enough to deliver devastating blows, especially when swung with strength.",
    ],
  },
  {
    name: "Nagaika",
    iconUrl: "/weapons/nagaika.svg",
    skill: "Fighting(Brawl)",
    range: "2m",
    damage: "1d10 + STR",
    attacks: "1",
    description:
      "The Nagaika is a Russian whip-like weapon, typically used to lash out at opponents. Its flexibility allows it to bypass defenses, making it effective for delivering quick, painful strikes. Often used in both combat and as a tool for subjugation.",
    properties: [
      "Flexible and long, able to strike at a distance with quick, painful lashes.",
      "Can bypass shields and armor due to its ability to coil around obstacles.",
      "Requires skill and precision to use effectively, making it a weapon of finesse.",
    ],
  },
  {
    name: "Bastardschwert Type 02",
    iconUrl: "/weapons/bastardschwert-type-02.svg",
    skill: "Fighting(Brawl)",
    range: "1(2)m",
    damage: "1d10 + STR",
    attacks: "1(2)",
    description:
      "The Bastardschwert Type 02 is a versatile one- or two-handed sword, offering a balance of speed and power. It is a hybrid weapon, perfect for those who need adaptability in the heat of combat. With the ability to switch between one and two hands, it offers flexibility for both defensive and offensive tactics.",
    properties: [
      "Can be wielded with one or two hands, switching between speed and power.",
      "Balanced for both slashing and thrusting attacks.",
      "Effective for a variety of combat styles.",
    ],
  },
  {
    name: "Nachtwind",
    iconUrl: "/weapons/nachtwind.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d8 + STR",
    attacks: "1",
    description:
      "The Nachtwind is a finely crafted sword known for its elegance and deadly precision. It is favored by those who focus on finesse over raw power. Its balanced design allows for fast strikes, often used by skilled duelists to target weak points in an opponent's defense.",
    properties: [
      "Light and precise, ideal for finesse attacks.",
      "Great for targeting weak points with speed and precision.",
      "Can be used to parry and counterattack effectively.",
    ],
  },
  {
    name: "Florett Type 01",
    iconUrl: "/weapons/florett-type-01.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d6 + DEX",
    attacks: "1",
    description:
      "The Florett Type 01 is a lightweight, flexible rapier designed for rapid thrusting attacks. It is a weapon favored by those who rely on agility and precision, often used in fencing or duels. The weapon excels in quick, pinpoint strikes, making it ideal for those who favor finesse and dexterity over raw strength.",
    properties: [
      "Light and agile, perfect for quick thrusts and rapid attacks.",
      "Allows finesse attacks, using Dexterity instead of Strength for attack rolls.",
      "Great for defensive maneuvers, allowing for quick counterattacks.",
    ],
  },
  {
    name: "Wolfsmesser",
    iconUrl: "/weapons/wolfsmesser.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d10 + STR",
    attacks: "1",
    description:
      "The Wolfsmesser is a large, single-edged sword known for its brutal slashing ability. It is a weapon favored by those who rely on power and cleaving attacks, often used to overwhelm opponents with its heavy strikes. It is effective for cutting through defenses and dealing significant damage.",
    properties: [
      "Heavy and powerful, ideal for cleaving strikes.",
      "Can break through armor and shields with powerful blows.",
      "Best used for overwhelming opponents with strength and precision.",
    ],
  },
  {
    name: "Khunchomer",
    iconUrl: "/weapons/khunchomer.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d8 + STR",
    attacks: "1",
    description:
      "The Khunchomer is a curved, versatile weapon originating from Central Asia. It is often used in both cutting and thrusting motions, making it effective in a variety of combat scenarios. Its unique curve and design allow for swift, powerful attacks that are difficult to block or parry.",
    properties: [
      "Curved design allows for powerful slashing and thrusting attacks.",
      "Effective at cutting through armor and defense.",
      "Requires finesse to use effectively, offering swift and precise strikes.",
    ],
  },
  {
    name: "Hakendolch",
    iconUrl: "/weapons/hakendolch.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d6 + DEX",
    attacks: "1",
    description:
      "The Hakendolch is a unique weapon featuring a curved blade designed for stabbing and slicing. Its short, hooked design makes it especially deadly in close-quarters combat, where quick, precise strikes are needed to catch an opponent off guard.",
    properties: [
      "Short and curved, ideal for close-range stabbing and slicing.",
      "Can bypass armor and defenses due to its unique blade shape.",
      "Allows finesse attacks, enabling the user to use Dexterity instead of Strength.",
    ],
  },

  {
    name: "Boronssichel",
    iconUrl: "/weapons/boronssichel.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d8 + STR",
    attacks: "1",
    description:
      "The Boronssichel is a large, curved scythe designed for swift, wide-reaching strikes. Its blade allows for sweeping attacks that can hit multiple opponents in a single movement. The weapon is effective against lightly armored or unarmored enemies.",
    properties: [
      "Curved blade, ideal for wide, sweeping strikes and area attacks.",
      "Effective against lightly armored or unarmored enemies.",
      "Good for dealing damage to groups, hitting multiple targets.",
    ],
  },
  {
    name: "Grober Sklaventod",
    iconUrl: "/weapons/grober-sklaventod.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d10 + STR",
    attacks: "1",
    description:
      "The Grober Sklaventod is a massive and brutal weapon designed to deal devastating damage with each strike. Its size and weight allow it to break through the defenses of stronger enemies, although its size makes it slow to wield. Ideal for combat against heavily armored foes.",
    properties: [
      "Deals massive damage and breaks defenses.",
      "Slow to wield, but extremely powerful.",
      "Ideal against heavily armored or shielded targets.",
    ],
  },
  {
    name: "Amazonensabel",
    iconUrl: "/weapons/amazonensabel.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d8 + STR",
    attacks: "1",
    description:
      "The Amazonensabel is a lightweight, curved sword designed for quick, precise strikes. Ideal for combatants who favor mobility, it allows for rapid attacks and evasive maneuvers, making it useful both offensively and defensively.",
    properties: [
      "Short, curved blade, ideal for fast and agile attacks.",
      "Perfect for combatants who prioritize speed and agility.",
      "Balanced, allowing for effective attacks and defenses.",
    ],
  },
  {
    name: "Zweihander",
    iconUrl: "/weapons/zweihander.svg",
    skill: "Fighting(Brawl)",
    range: "2m",
    damage: "1d12 + STR",
    attacks: "1(2)",
    description:
      "The Zweihander is an extremely heavy two-handed sword designed to deliver crushing blows. Its large size allows it to strike multiple enemies with a single blow, but it requires significant strength to wield effectively. Ideal for combat against groups or heavily armored foes.",
    properties: [
      "Two-handed sword with great reach and damage.",
      "Ideal for mass attacks, hitting multiple enemies.",
      "Requires significant strength to wield properly.",
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
