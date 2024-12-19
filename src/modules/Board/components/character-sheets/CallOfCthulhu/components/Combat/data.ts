export const weapons: Array<IWeapon> = [
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
  {
    name: "Dolch",
    iconUrl: "/weapons/dolch.svg",
    skill: "Fighting(Brawl)",
    range: "0.5m",
    damage: "1d6 + STR",
    attacks: "1",
    description:
      "The Dolch is a small, versatile dagger used for quick, precise strikes. It is favored by assassins and those who require a lightweight weapon for stealthy attacks.",
    properties: [
      "Light and easy to conceal.",
      "Good for quick, stealthy strikes.",
      "Ideal for close combat and surprise attacks.",
    ],
  },
  {
    name: "Schwerer Dolch",
    iconUrl: "/weapons/schwerer-dolch.svg",
    skill: "Fighting(Brawl)",
    range: "0.7m",
    damage: "1d8 + STR",
    attacks: "1",
    description:
      "The Schwerer Dolch is a heavier and larger version of the standard dagger. It has more reach and can deal more damage with each strike, making it suitable for direct combat.",
    properties: [
      "Heavier than a regular dagger, offering more damage.",
      "Longer reach, effective for close-quarters combat.",
      "Good for both stabbing and slashing.",
    ],
  },
  {
    name: "Sabel",
    iconUrl: "/weapons/sabel.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d8 + STR",
    attacks: "1",
    description:
      "The Sabel is a curved sword known for its speed and fluidity in combat. It is ideal for slashing attacks and quick maneuvers, making it favored by many skilled sword fighters.",
    properties: [
      "Curved blade ideal for slashing.",
      "Fast and fluid in combat.",
      "Good for quick strikes and counters.",
    ],
  },
  {
    name: "Bastardschwert Type 01",
    iconUrl: "/weapons/bastardschwert-type-01.svg",
    skill: "Fighting(Brawl)",
    range: "1.5m",
    damage: "1d10 + STR",
    attacks: "1",
    description:
      "The Bastardschwert is a versatile sword that can be wielded with one or two hands. It offers a balance between speed and power, making it effective for various combat styles.",
    properties: [
      "Can be used one or two-handed.",
      "Versatile and balanced, offering both speed and power.",
      "Effective for cutting and thrusting attacks.",
    ],
  },
  {
    name: "Sichel",
    iconUrl: "/weapons/sichel.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d8 + STR",
    attacks: "1",
    description:
      "The Sichel is a curved blade designed for wide, sweeping attacks. It excels in hitting multiple enemies or dealing heavy damage to lightly armored foes.",
    properties: [
      "Curved blade for sweeping attacks.",
      "Ideal for hitting multiple targets.",
      "Effective against lightly armored enemies.",
    ],
  },
  {
    name: "Keule",
    iconUrl: "/weapons/keule.svg",
    skill: "Fighting(Brawl)",
    range: "1.5m",
    damage: "1d10 + STR",
    attacks: "1",
    description:
      "The Keule is a heavy, blunt weapon used for smashing through enemy defenses. It is favored for its ability to deal devastating damage to opponents with little armor.",
    properties: [
      "Blunt weapon ideal for smashing and crushing.",
      "Deals heavy damage, effective against lightly armored or unarmored foes.",
      "Slower to wield but powerful.",
    ],
  },
  {
    name: "Entermesser",
    iconUrl: "/weapons/entermesser.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d6 + STR",
    attacks: "1",
    description:
      "The Entermesser is a short, sharp sword designed for quick and precise strikes. It is effective for combatants who favor speed over raw power.",
    properties: [
      "Light and fast, ideal for quick strikes.",
      "Effective for skilled sword fighters.",
      "Good for thrusting and cutting.",
    ],
  },
  {
    name: "Florett Type 02",
    iconUrl: "/weapons/florett-type-02.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d6 + STR",
    attacks: "1",
    description:
      "The Florett Type 02 is a lightweight and flexible fencing sword designed for quick, precise thrusts. It is ideal for those who focus on speed and agility in their strikes.",
    properties: [
      "Lightweight and flexible.",
      "Ideal for precise thrusting attacks.",
      "Great for agility-based combat.",
    ],
  },
  {
    name: "Baton",
    iconUrl: "/weapons/baton.svg",
    skill: "Fighting(Brawl)",
    range: "0.5m",
    damage: "1d4 + STR",
    attacks: "1",
    description:
      "The Baton is a small, lightweight weapon designed for non-lethal combat. It is commonly used by law enforcement or for self-defense, delivering quick strikes to disarm or incapacitate opponents.",
    properties: [
      "Lightweight and easy to handle.",
      "Designed for non-lethal combat.",
      "Good for disarming or incapacitating opponents.",
    ],
  },
  {
    name: "Brass Knuckles",
    iconUrl: "/weapons/brass-knuckles.svg",
    skill: "Fighting(Brawl)",
    range: "0m",
    damage: "1d4 + STR",
    attacks: "1",
    description:
      "Brass Knuckles are worn over the fingers to enhance the user's punching power. They are ideal for quick, brutal strikes in close combat.",
    properties: [
      "Enhances punching power.",
      "Good for close-range combat.",
      "Quick and easy to use in tight situations.",
    ],
  },
  {
    name: "Elfenbogen",
    iconUrl: "/weapons/elfenbogen.svg",
    skill: "Fighting(Brawl)",
    range: "20m",
    damage: "1d6 + DEX",
    attacks: "1",
    description:
      "The Elfenbogen is a finely crafted bow used by elves, known for its precision and lightweight design. It allows for fast and accurate long-range attacks.",
    properties: [
      "Lightweight and fast to draw.",
      "Ideal for long-range precision attacks.",
      "Requires high Dexterity to use effectively.",
    ],
  },
  {
    name: "Kompositbogen",
    iconUrl: "/weapons/kompositbogen.svg",
    skill: "Fighting(Brawl)",
    range: "30m",
    damage: "1d8 + DEX",
    attacks: "1",
    description:
      "The Kompositbogen is a composite bow that combines multiple materials for enhanced power and durability. It is great for both long-range accuracy and heavy damage.",
    properties: [
      "Powerful and durable, ideal for ranged combat.",
      "Requires strength and Dexterity to use effectively.",
      "Good for hunting or battle.",
    ],
  },
  {
    name: "Langbogen",
    iconUrl: "/weapons/langbogen.svg",
    skill: "Fighting(Brawl)",
    range: "40m",
    damage: "1d10 + DEX",
    attacks: "1",
    description:
      "The Langbogen is a large, traditional longbow. It is favored by archers for its impressive range and powerful shots, capable of dealing heavy damage from a distance.",
    properties: [
      "Very long range and powerful damage.",
      "Requires considerable strength to use effectively.",
      "Effective for long-distance combat.",
    ],
  },
  {
    name: "Katana Type 01",
    iconUrl: "/weapons/katana-type-01.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d8 + STR",
    attacks: "1",
    description:
      "Katana Type 01 is a traditional Japanese sword known for its sharpness and precision. It is ideal for quick, decisive strikes in close combat.",
    properties: [
      "Balanced blade, great for slashing and cutting.",
      "Requires skill and precision to wield effectively.",
      "Great for close-range, swift combat.",
    ],
  },
  {
    name: "Katana Type 02",
    iconUrl: "/weapons/katana-type-02.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d10 + STR",
    attacks: "1",
    description:
      "Katana Type 02 is a heavier variant of the classic katana, offering more power behind each strike. It is designed for experienced users who seek both precision and strength.",
    properties: [
      "Heavier than Type 01, offering more damage.",
      "Suitable for powerful, cutting strikes.",
      "Requires strength and skill to wield effectively.",
    ],
  },
  {
    name: "Latin",
    iconUrl: "/weapons/latin.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d6 + STR",
    attacks: "1",
    description:
      "The Latin is a type of short sword with a straight blade, commonly used for thrusting and stabbing. It is known for its quick, precise strikes in close combat.",
    properties: [
      "Light and quick, ideal for thrusting attacks.",
      "Good for fast and precise strikes.",
      "Effective in close-quarters combat.",
    ],
  },
  {
    name: "Barong",
    iconUrl: "/weapons/barong.svg",
    skill: "Fighting(Brawl)",
    range: "1m",
    damage: "1d8 + STR",
    attacks: "1",
    description:
      "The Barong is a traditional Filipino sword with a leaf-shaped blade. It is excellent for both cutting and stabbing, favored for its versatility in combat.",
    properties: [
      "Leaf-shaped blade great for cutting and slashing.",
      "Versatile weapon suitable for close and medium-range attacks.",
      "Requires good technique for effective use.",
    ],
  },
  {
    name: "Mace",
    iconUrl: "/weapons/mace.svg",
    skill: "Fighting(Brawl)",
    range: "1.5m",
    damage: "1d8 + STR",
    attacks: "1",
    description:
      "The Mace is a blunt weapon with a heavy head, perfect for delivering crushing blows. It is highly effective against armored foes and in crowd control.",
    properties: [
      "Blunt weapon, effective against armored enemies.",
      "Deals significant damage with each strike.",
      "Slower to swing but powerful.",
    ],
  },
  {
    name: "Richtschwert",
    iconUrl: "/weapons/richtschwert.svg",
    skill: "Fighting(Brawl)",
    range: "1.5m",
    damage: "1d8 + STR",
    attacks: "1",
    description:
      "The Richtschwert is a longsword designed for precision strikes. It is ideal for both cutting and thrusting, often used by knights and elite warriors.",
    properties: [
      "Balanced sword great for cutting and thrusting.",
      "Versatile in combat, effective in both offense and defense.",
      "Requires good skill for optimal use.",
    ],
  },
  {
    name: "Club Weapon Type 03",
    iconUrl: "/weapons/club-weapon-type-03.svg",
    skill: "Fighting(Brawl)",
    range: "1.5m",
    damage: "1d10 + STR",
    attacks: "1",
    description:
      "Club Weapon Type 03 is a heavy, blunt instrument designed to deal crushing damage. It is ideal for smashing through defenses and overpowering foes.",
    properties: [
      "Heavy blunt weapon for crushing damage.",
      "Ideal for breaking through armor and shields.",
      "Slower to swing but highly effective in close combat.",
    ],
  },
  {
    name: "Knife",
    iconUrl: "/guns/knife.svg",
    skill: "Fighting(Brawl)",
    damage: "1d4 + STR",
    attacks: "1",
    ammo: 0,
    range: "Melee",
    malfunction: 0,
    description:
      "A simple, reliable knife, used primarily for close combat or utility purposes. It is easy to carry and can be wielded quickly.",
    properties: [
      "Melee weapon with quick attack speed.",
      "Can be used for both combat and survival tasks.",
      "Ideal for close-range combat.",
      "Does not require ammunition or reloading.",
    ],
  },
]

export const guns: Array<IGun> = [
  {
    name: "Assault Rifle 01",
    iconUrl: "/guns/assault-rifle-01.svg",
    skill: "Firearms(R/S)",
    damage: "2d8 + 2",
    attacks: "1",
    ammo: 30,
    range: "500m",
    malfunction: 85,
    description:
      "The Assault Rifle 01 is a versatile, fully automatic weapon designed for medium to long-range combat. It is ideal for infantry units due to its reliability and firepower.",
    properties: [
      "Fires in both semi-automatic and fully automatic modes.",
      "Commonly uses 5.56x45mm NATO ammunition.",
      "Lightweight and durable, designed for easy handling in various conditions.",
      "Effective in both urban and open combat scenarios.",
    ],
  },
  {
    name: "Assault Rifle 02",
    iconUrl: "/guns/assault-rifle-02.svg",
    skill: "Firearms(R/S)",
    damage: "2d8 + 3",
    attacks: "1",
    ammo: 30,
    range: "600m",
    malfunction: 85,
    description:
      "The Assault Rifle 02 builds on the previous version with enhanced accuracy and a higher rate of fire. It is optimized for both close-quarter battle and longer-range engagements.",
    properties: [
      "Improved accuracy and recoil management compared to previous models.",
      "Uses 5.56x45mm NATO ammunition.",
      "Can be customized with different sights and attachments.",
      "Durable under harsh conditions, maintaining performance in extreme temperatures.",
    ],
  },
  {
    name: "Assault Rifle 03",
    iconUrl: "/guns/assault-rifle-03.svg",
    skill: "Firearms(R/S)",
    damage: "2d10 + 2",
    attacks: "1",
    ammo: 30,
    range: "700m",
    malfunction: 90,
    description:
      "The Assault Rifle 03 is a high-performance weapon with advanced features for precision and fire rate. It is widely used by special forces and military units for its flexibility.",
    properties: [
      "Can switch between semi-automatic, burst, and fully automatic firing modes.",
      "Uses 7.62x39mm ammunition for higher stopping power.",
      "Ideal for both assault and sniper support roles with proper attachments.",
      "Higher malfunction rate due to increased complexity.",
    ],
  },
  {
    name: "Assault Rifle 04",
    iconUrl: "/guns/assault-rifle-04.svg",
    skill: "Firearms(R/S)",
    damage: "2d8 + 4",
    attacks: "1",
    ammo: 30,
    range: "600m",
    malfunction: 85,
    description:
      "The Assault Rifle 04 is an advanced tactical weapon with increased magazine capacity and better ergonomics, suitable for extended combat operations.",
    properties: [
      "Equipped with a high-capacity 40-round magazine for extended fire.",
      "Compatible with advanced scopes and suppressors.",
      "Built for durability and precision under field conditions.",
      "Uses 5.56x45mm NATO ammunition.",
    ],
  },
  {
    name: "Assault Rifle 05",
    iconUrl: "/guns/assault-rifle-05.svg",
    skill: "Firearms(R/S)",
    damage: "2d6 + 4",
    attacks: "1",
    ammo: 30,
    range: "700m",
    malfunction: 85,
    description:
      "The Assault Rifle 05 is a next-generation weapon system designed for high accuracy and increased power. Its lightweight construction and modular design make it a top choice for elite units.",
    properties: [
      "Uses a hybrid of 5.56x45mm NATO and 6.8mm rounds, depending on mission needs.",
      "Modular design allows for rapid customization and upgradeability.",
      "Superior ergonomics for extended use in field combat.",
      "Integrates seamlessly with modern tech like drone targeting systems and advanced optics.",
    ],
  },
  {
    name: "AK-47 Type 01",
    iconUrl: "/guns/ak47-type-01.svg",
    skill: "Firearms(R/S)",
    damage: "2d6",
    attacks: "1",
    ammo: 30,
    range: "300m",
    malfunction: 5,
    description:
      "The AK-47 Type 01 is a reliable and versatile assault rifle with semi-automatic and automatic firing capabilities. It is known for its durability and high rate of fire, making it effective in a variety of combat scenarios. Equipped with modernized sights, this weapon is effective at both long and short ranges.",
    properties: [
      "",
      "High rate of fire and effective at mid-to-long range.",
      "Rugged and durable design.",
      "5% malfunction rate under heavy use.",
    ],
  },
  {
    name: "AK-47 Type 02",
    iconUrl: "/guns/ak47-type-02.svg",
    skill: "Firearms(R/S)",
    damage: "2d6 + 2",
    attacks: "1",
    ammo: 30,
    range: "300m",
    malfunction: 85,
    description:
      "The AK-47 Type 02 is a modernized version of the iconic assault rifle, offering improved accuracy and durability while retaining the power and reliability of its predecessor. It is designed for sustained fire in both close and medium-range combat.",
    properties: [
      "Semi-automatic and fully automatic fire modes.",
      "Fires 7.62x39mm rounds, known for their power and range.",
      "Reliable in harsh environments, with a high tolerance for dirt and neglect.",
      "Commonly used by military forces and insurgents worldwide.",
    ],
  },
  {
    name: "AK-47 Type 03",
    iconUrl: "/guns/ak47-type-03.svg",
    skill: "Firearms(R/S)",
    damage: "2d6 + 3",
    attacks: "1",
    ammo: 30,
    range: "400m",
    malfunction: 85,
    description:
      "The AK-47 Type 03 is a further enhanced version of the AK-47 assault rifle, featuring improved accuracy, recoil control, and a more durable design. It remains one of the most reliable weapons in combat, widely used by military units across the globe.",
    properties: [
      "Improved accuracy over previous versions.",
      "Uses 7.62x39mm ammunition, known for its stopping power.",
      "Can be used in both semi-automatic and fully automatic firing modes.",
      "Highly resilient in extreme conditions, including mud, dust, and wet environments.",
      "Common in both military and insurgent hands worldwide.",
    ],
  },

  {
    name: "Dragunov",
    iconUrl: "/guns/dragunov.svg",
    skill: "Firearms(R/S)",
    damage: "2d10 + 4",
    attacks: "1",
    ammo: 10,
    range: "1300m",
    malfunction: 1,
    description:
      "The Dragunov is a semi-automatic sniper rifle designed for long-range precision. It is commonly used for anti-personnel and anti-material engagements.",
    properties: [
      "Semi-automatic sniper rifle with high accuracy at long ranges.",
      "Uses 7.62x54mmR ammunition for superior stopping power.",
      "Ideal for military and specialized sniping operations.",
      "Effective range up to 1300 meters with proper optics.",
    ],
  },
  {
    name: "M4-22",
    iconUrl: "/guns/m4-22.svg",
    skill: "Firearms(R/S)",
    damage: "2d6 + 2",
    attacks: "1",
    ammo: 25,
    range: "500m",
    malfunction: 1,
    description:
      "The M4-22 is a compact, lightweight, and versatile rifle chambered in .22 LR. It's primarily used for training, plinking, and small-game hunting.",
    properties: [
      "Compact and lightweight, ideal for training purposes.",
      "Chambered in .22 LR, low recoil and high accuracy.",
      "Suitable for training with similar handling to military M4 rifles.",
      "Effective range up to 500 meters, but optimal for close to medium-range engagements.",
    ],
  },
  {
    name: "PP71",
    iconUrl: "/guns/pp71.svg",
    skill: "Firearms(R/S)",
    damage: "2d6 + 1",
    attacks: "1",
    ammo: 20,
    range: "100m",
    malfunction: 1,
    description:
      "The PP71 is a submachine gun with a fast rate of fire, commonly used in close quarters combat. It is highly effective for urban environments or as a personal defense weapon.",
    properties: [
      "High rate of fire for close combat situations.",
      "Uses 9mm ammunition, with manageable recoil for rapid follow-up shots.",
      "Compact and lightweight, easy to conceal and maneuver.",
      "Effective range up to 100 meters, best suited for CQB (close-quarters battle).",
    ],
  },
  {
    name: "M110 SASS",
    iconUrl: "/guns/m110-sass.svg",
    skill: "Firearms(R/S)",
    damage: "2d12 + 5",
    attacks: "1",
    ammo: 20,
    range: "800m",
    malfunction: 1,
    description:
      "The M110 SASS (Semi-Automatic Sniper System) is designed for precision shooting at extended ranges. It is highly favored for both military and law enforcement sniper operations.",
    properties: [
      "Semi-automatic sniper rifle with high precision and rate of fire.",
      "Uses 7.62x51mm NATO ammunition for long-range engagements.",
      "Can be fitted with various optics and suppressors.",
      "Effective range up to 800 meters, ideal for tactical sniping.",
    ],
  },

  {
    name: "Pistol 01",
    iconUrl: "/guns/pistol-01.svg",
    skill: "Firearms(HG)",
    damage: "1d6 + 1",
    attacks: "1",
    ammo: 15,
    range: "50m",
    malfunction: 2,
    description:
      "Pistol 01 is a reliable sidearm designed for close-range engagements. It's lightweight and compact, ideal for personal defense.",
    properties: [
      "Semi-automatic pistol with moderate recoil.",
      "Uses 9mm ammunition for decent stopping power.",
      "Lightweight and easy to carry for personal defense.",
      "Effective range up to 50 meters.",
    ],
  },
  {
    name: "Pistol 02",
    iconUrl: "/guns/pistol-02.svg",
    skill: "Firearms(HG)",
    damage: "1d6 + 2",
    attacks: "1",
    ammo: 12,
    range: "50m",
    malfunction: 1,
    description:
      "Pistol 02 is a more powerful sidearm with enhanced accuracy and recoil management. It’s suited for law enforcement and military operations.",
    properties: [
      "Semi-automatic pistol with reduced recoil.",
      "Uses .40 S&W ammunition, providing better stopping power than 9mm.",
      "Enhanced grip and sights for accuracy.",
      "Effective range up to 50 meters, optimized for quick target acquisition.",
    ],
  },
  {
    name: "Pistol 03",
    iconUrl: "/guns/pistol-03.svg",
    skill: "Firearms(HG)",
    damage: "1d8 + 2",
    attacks: "1",
    ammo: 10,
    range: "40m",
    malfunction: 1,
    description:
      "Pistol 03 is a compact, high-caliber sidearm designed for concealment. It offers a great balance between power and portability.",
    properties: [
      "Compact pistol with high stopping power.",
      "Uses .45 ACP ammunition for significant damage.",
      "Easy to conceal, ideal for concealed carry.",
      "Effective range up to 40 meters.",
    ],
  },
  {
    name: "Pistol 04",
    iconUrl: "/guns/pistol-04.svg",
    skill: "Firearms(HG)",
    damage: "1d6 + 3",
    attacks: "1",
    ammo: 17,
    range: "60m",
    malfunction: 1,
    description:
      "Pistol 04 offers a higher magazine capacity and longer range, making it a versatile choice for both self-defense and tactical scenarios.",
    properties: [
      "Semi-automatic pistol with a larger magazine.",
      "Uses 9mm ammunition, offering a good balance between recoil and firepower.",
      "Effective range up to 60 meters, suitable for medium-range engagements.",
      "Reliable and durable for prolonged use.",
    ],
  },
  {
    name: "Pistol 05",
    iconUrl: "/guns/pistol-05.svg",
    skill: "Firearms(HG)",
    damage: "1d8 + 1",
    attacks: "1",
    ammo: 10,
    range: "40m",
    malfunction: 1,
    description:
      "Pistol 05 is a high-powered pistol designed for more tactical use, with superior damage output for a variety of situations.",
    properties: [
      "High-powered semi-automatic pistol.",
      "Uses .44 Magnum ammunition for superior stopping power.",
      "Fitted with tactical sights for improved aim.",
      "Effective range up to 40 meters.",
    ],
  },
  {
    name: "Pistol 06",
    iconUrl: "/guns/pistol-06.svg",
    skill: "Firearms(HG)",
    damage: "1d6 + 1",
    attacks: "1",
    ammo: 8,
    range: "30m",
    malfunction: 2,
    description:
      "Pistol 06 is a compact revolver, excellent for personal defense and close-range combat. Its reliability is its greatest strength.",
    properties: [
      "Compact and reliable revolver.",
      "Uses .38 Special ammunition, ideal for close-range self-defense.",
      "Simple design, easy to maintain.",
      "Effective range up to 30 meters, with high reliability.",
    ],
  },
  {
    name: "Pistol 07",
    iconUrl: "/guns/pistol-07.svg",
    skill: "Firearms(HG)",
    damage: "1d6 + 2",
    attacks: "1",
    ammo: 10,
    range: "50m",
    malfunction: 2,
    description:
      "Pistol 07 is a full-size handgun designed for tactical operations. It combines a high rate of fire with precision.",
    properties: [
      "Full-size semi-automatic handgun.",
      "Uses 9mm ammunition for a balance of power and recoil control.",
      "Equipped with tactical sights and suppressor compatibility.",
      "Effective range up to 50 meters.",
    ],
  },
  {
    name: "Pistol 08",
    iconUrl: "/guns/pistol-08.svg",
    skill: "Firearms(HG)",
    damage: "1d6 + 1",
    attacks: "1",
    ammo: 12,
    range: "45m",
    malfunction: 1,
    description:
      "Pistol 08 is a mid-range handgun with a good magazine size, designed for use in both tactical and civilian environments.",
    properties: [
      "Semi-automatic handgun with a solid magazine capacity.",
      "Uses 9mm ammunition, providing a good combination of recoil control and damage.",
      "Versatile for both tactical and personal defense use.",
      "Effective range up to 45 meters.",
    ],
  },
  {
    name: "Colt Revolver",
    iconUrl: "/guns/colt-revolver.svg",
    skill: "Firearms(HG)",
    damage: "1d8",
    attacks: "1",
    ammo: 6,
    range: "20m",
    malfunction: 1,
    description:
      "The Colt Revolver is a classic firearm, known for its reliability and power. It’s a revolver with a strong kick, ideal for close-range defense.",
    properties: [
      "Revolver design with six-round capacity.",
      "Uses .45 Colt ammunition, offering significant damage at short range.",
      "Effective range up to 20 meters.",
      "Recoil can be challenging for beginners.",
    ],
  },
  {
    name: "Revolver",
    iconUrl: "/guns/revolver.svg",
    skill: "Firearms(HG)",
    damage: "1d6 + 1",
    attacks: "1",
    ammo: 6,
    range: "25m",
    malfunction: 2,
    description:
      "A reliable revolver used for close-quarters combat. It is simple and effective, though slower to reload.",
    properties: [
      "Standard six-round revolver.",
      "Uses .38 Special ammunition for moderate damage.",
      "Effective range up to 25 meters.",
      "Can be easily concealed for personal defense.",
    ],
  },
  {
    name: "M4-22 Pistol",
    iconUrl: "/guns/m4-22-pistol.svg",
    skill: "Firearms(HG)",
    damage: "1d6",
    attacks: "1",
    ammo: 10,
    range: "50m",
    malfunction: 1,
    description:
      "The M4-22 Pistol is a compact, high-velocity weapon used in both military and civilian applications. It is effective for medium-range defense.",
    properties: [
      "Semi-automatic pistol with a large magazine capacity.",
      "Uses .22 LR ammunition, making it suitable for training and light defense.",
      "Effective range up to 50 meters.",
      "Lightweight and easy to handle, even for inexperienced shooters.",
    ],
  },

  {
    name: "Machin Gun",
    iconUrl: "/guns/machin-gun.svg",
    skill: "Firearms(HW)",
    damage: "2d10",
    attacks: "3",
    ammo: 100,
    range: "200m",
    malfunction: 95,
    description:
      "The Machine Gun is a high-caliber, fully automatic weapon designed for sustained fire. It is ideal for suppressive fire and engaging multiple targets at medium to long range.",
    properties: [
      "Fully automatic fire for high damage output.",
      "Capable of suppressing enemies effectively.",
      "Large ammo capacity but requires frequent reloads.",
      "Heavy weapon, reducing mobility when carried.",
      "High recoil, requiring skill to control in continuous fire.",
    ],
  },

  {
    name: "Shotgun 01",
    iconUrl: "/guns/shotgun-01.svg",
    skill: "Firearms(R/S)",
    damage: "2d8",
    attacks: "1",
    ammo: 6,
    range: "30m(10m)",
    malfunction: 95,
    description:
      "Shotgun 01 is a standard pump-action shotgun, effective at close range. It delivers powerful, wide-spread damage, ideal for crowd control or single-target engagements.",
    properties: [
      "High damage at close range.",
      "Spread reduces effectiveness at longer distances.",
      "Pump-action requires reloading after each shot.",
      "Versatile for both hunting and combat.",
    ],
  },
  {
    name: "Shotgun 02",
    iconUrl: "/guns/shotgun-02.svg",
    skill: "Firearms(R/S)",
    damage: "2d10",
    attacks: "1",
    ammo: 8,
    range: "40m(15m)",
    malfunction: 96,
    description:
      "Shotgun 02 is a semi-automatic shotgun, offering faster follow-up shots and increased ammo capacity. It excels in close-quarters combat.",
    properties: [
      "Semi-automatic fire for rapid shots.",
      "Spread pattern covers a wide area, ideal for groups.",
      "Slightly heavier than standard shotguns.",
      "Increased magazine size for sustained fire.",
    ],
  },
  {
    name: "Shotgun 03",
    iconUrl: "/guns/shotgun-03.svg",
    skill: "Firearms(R/S)",
    damage: "3d6",
    attacks: "1",
    ammo: 5,
    range: "50m(20m)",
    malfunction: 94,
    description:
      "Shotgun 03 is a high-powered, double-barreled shotgun. Its devastating power is balanced by limited ammo and a slower reload speed.",
    properties: [
      "Double-barreled design allows for two rapid shots.",
      "Incredible stopping power in close engagements.",
      "Low ammo capacity and slower reload speed.",
      "Perfect for delivering critical damage in a pinch.",
    ],
  },
  {
    name: "Benelli M4",
    iconUrl: "/guns/benelli-m4.svg",
    skill: "Firearms(R/S)",
    damage: "4d6",
    attacks: "1",
    ammo: 7,
    range: "50m",
    malfunction: 96,
    description:
      "The Benelli M4 is a semi-automatic shotgun designed for versatility and reliability in close-quarters combat. Its gas-operated system ensures rapid cycling and reduced recoil.",
    properties: [
      "Semi-automatic shotgun ideal for close-quarters engagements.",
      "High stopping power with limited effective range.",
      "Gas-operated system for reduced recoil and quick follow-up shots.",
      "Durable and reliable in various combat scenarios.",
      "Limited ammunition capacity compared to other firearms.",
    ],
  },

  {
    name: "RPG",
    iconUrl: "/guns/rpg.svg",
    skill: "Firearms(HW)",
    damage: "8d10 (blast radius 5m)",
    attacks: "1",
    ammo: 1,
    range: "300m",
    malfunction: 94,
    description:
      "The RPG (Rocket-Propelled Grenade) is a shoulder-fired, anti-tank weapon designed to deliver explosive projectiles with significant destructive power. Effective against vehicles, structures, and clustered enemies.",
    properties: [
      "Single-use explosive projectile with a high blast radius.",
      "Effective against armored targets and fortifications.",
      "Requires precision aiming due to limited ammunition.",
      "Blast damage affects all entities within a 5-meter radius.",
      "Prone to malfunctions if mishandled or damaged.",
    ],
  },

  {
    name: "M240",
    iconUrl: "/guns/m240.svg",
    skill: "Firearms(HW)",
    damage: "2d6+4",
    attacks: "3",
    ammo: 100,
    range: "1,100m",
    malfunction: 96,
    description:
      "The M240 is a belt-fed, gas-operated machine gun known for its reliability and high rate of fire. It is widely used for suppressive fire in both defensive and offensive operations.",
    properties: [
      "High rate of fire for suppressive capabilities.",
      "Belt-fed with a capacity of 100 rounds.",
      "Effective against groups of enemies and lightly armored targets.",
      "Requires a bipod or tripod for optimal operation due to recoil.",
      "Reliable in adverse conditions, though prone to overheating during prolonged use.",
    ],
  },
]

// {
//   name: "AK-47 Type 03",
//   iconUrl: "/guns/Shotgun 03.svg",
//   skill: "Firearms(R/S)",
//   damage: "",
//   attacks: "",
//   ammo: ,
//   range: "",
//   malfunction: ,
//   description:
//     "",
//   properties: [
//     "",
//   ],
// },
{
  /* 
  
   AK47-Type01-Size256-Rotation30


  */
}
