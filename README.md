<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/mgnfy-view/the-knights-quest">
    <img src="./public/images/iconScaled.png" alt="Logo" width="80" height="80" />
  </a>

  <h3 align="center">The Knight's Quest</h3>

  <p align="center">
    A bite-sized platforming game with a greedy knight
    <br />
    <a href="https://mgnfy-view.itch.io/the-knights-quest">Play</a>
    -
    <a href="https://github.com/mgnfy-view/the-knights-quest/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    -
    <a href="https://github.com/mgnfy-view/the-knights-quest/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

<img src="./public/images/screenshot.png" width="540" />

The knight's quest is a single-player, platforming game built with javascript and kaplay, a javscript based game engine. With bite-sized but well thought levels, simple controls, and a decent set of mechanics, it is a great choice for a small gaming session.

It has also been published on [itch.io](https://mgnfy-view.itch.io/the-knights-quest).

More levels will be added over time!


### Built With

- ![JavaScript][javascript-url]
- ![Kaplay](https://img.shields.io/badge/-KAPLAY-6BC96C.svg?style=for-the-badge)
- ![PNPM][pnpm-url]


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Make sure you have git, nodejs, and pnpm installed and configured on your system.

### Installation

Clone the repo and cd into it

```shell
git clone https://github.com/mgnfy-view/the-knights-quest
cd the-knights-quest
```

Install the project's dependencies

```shell
pnpm install
```

Start the server to run the game locally

```shell
pnpm run dev
```

Thats' it, you should be ready to go now.


<!-- USAGE EXAMPLES -->
## Usage

You can use the arrow keys to move left and right. Press the spacebar to jump and x to shoot fire balls. Fire balls can destroy tiles (red blocks) as well as scaffolds (purple blocks). Water elevators allow you to climb greater heights. Collect all the coins to make the knight happy!

Here are some in-game screenshots

<img src="./public/images/display1.png" width="540" />

<img src="./public/images/display2.png" width="540" />

<img src="./public/images/display3.png" width="540" />


<!-- ROADMAP -->
## Roadmap

- [x] Make a sprite sheet using Aesprite
- [x] Design levels with the Tiled map editor
- [x] Develop the game with javascript and kaplay
  - [x] Add scenes
    - [x] Add game objects
    - [x] Register controls
    - [x] Register events
  - [x] Add global state
  - [x] Add a menu and ending screen
  - [x] Code review and cleanup
- [x] Write a good README.md

See the [open issues](https://github.com/mgnfy-view/the-knights-quest/issues) for a full list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

I'd love to see contributions that add more levels to game. You don't have to write a single line of code to submit levels. Use the spritesheet from `./public/spriteSheets/spriteSheet.png` and the tiled map editor to create a level. Export the map in the `.tmx` form in the `./public/tiled` folder, and create a pull request. It's that easy!


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


<!-- CONTACT -->
## Contact

Here's a gateway to all my socials, don't forget to hit me up!

[![Linktree](https://img.shields.io/badge/linktree-1de9b6?style=for-the-badge&logo=linktree&logoColor=white)][linktree-url]


<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/mgnfy-view/the-knights-quest.svg?style=for-the-badge
[contributors-url]: https://github.com/mgnfy-view/the-knights-quest/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/mgnfy-view/the-knights-quest.svg?style=for-the-badge
[forks-url]: https://github.com/mgnfy-view/the-knights-quest/network/members
[stars-shield]: https://img.shields.io/github/stars/mgnfy-view/the-knights-quest.svg?style=for-the-badge
[stars-url]: https://github.com/mgnfy-view/the-knights-quest/stargazers
[issues-shield]: https://img.shields.io/github/issues/mgnfy-view/the-knights-quest.svg?style=for-the-badge
[issues-url]: https://github.com/mgnfy-view/the-knights-quest/issues
[license-shield]: https://img.shields.io/github/license/mgnfy-view/the-knights-quest.svg?style=for-the-badge
[license-url]: https://github.com/mgnfy-view/the-knights-quest/blob/master/LICENSE.txt
[javascript-url]: https://img.shields.io/badge/Javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[pnpm-url]: https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220
[linktree-url]: https://linktr.ee/mgnfy.view
