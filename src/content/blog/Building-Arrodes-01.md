---
title: "Building Arrodes - 01"
author: ["DeadMeme5441"]
description: "Building my own text editor with C++ and Raylib."
date: 2025-10-09
lastmod: 2025-10-09T18:22:10+05:30
draft: false
---

## Building Arrodes (My own text editor) {#Building-Arrodes-01}


### Background {#background}

I really really like Emacs. I don't know how to use it really well, but I really like Emacs. I tried building my own configuration,
but that didn't work out really well - I just went back to doom emacs and I just settled for writing config.el and calling it a day.
But - what I really wanted to do, was to have a browser in my editor, as well as a personal AI assistant, as well as all the features I use in emacs basically.

I love elisp as a language, but having to implement even the most basic functions that SHOULD have been in the stdlib (I'm going to get a lot of flak for this) -
because I understand it's a beautiful language - it's just my skill issue I guess. So - CONFIGURING emacs to do what I want turned out to be
wayy more tedious and time-consuming than I expected. To deal with this specific problem, I decided - as all programmers do - to build my own editor.

Given this background - I really also wanted to learn C++ and Raylib specifically - it looks so cool honestly. In that spirit, I decided to write my own editor,
using C++ and raylib - called Arrodes. This set of blogs will properly chart my progress and the work I've done while learning C++, raylib, as well as learning
how to build my own text editor - which seems fun honestly.

And also - given raylib is a "game development" library, I can even put an anime girl on the right hand side - like neurosama while I write code! That's me getting
ahead of myself, but that's been the idea basically. Also I would like to learn "proper" game development one day, so this seemed like a fun side project to get on.


### The name Arrodes {#the-name-arrodes}

The name Arrodes comes from Lord of the Mysteries - a chinese webnovel that has themes of steampunk, lovecraftian horrors, magic and SCP style objects known as sealed
artifacts. Arrodes is one such "sealed artifact" - it's a mirror that you can ask any question to, and it will answer. But the catch is - it gets to ask you one question
or make you do a task in return. If you lie, or refuse the task, you get smited by lightning from heaven. That's the punishment.

I guess I really like the concept of the character, and how a programmer must treat his editor/computer the same way - he gets to ask the editor to do things for him, and when
the editor asks a "question back", i.e. throws an error etc. - he has to do right by it, or be smote by the heavens himself. I guess that's the concept I was going for.


### What I'm using to build this site {#what-i-m-using-to-build-this-site}

The following are what I'm using:

[Raylib](https://www.raylib.com)
: Core graphics library that powers the UI layer.

[Raylib CPP Starter](https://github.com/CapsCollective/raylib-cpp-starter)
: Boilerplate that sets up a C++ project structure around Raylib.

[Build Your Own Text Editor](https://viewsourcecode.org/snaptoken/kilo/index.html)
: The tutorial series I'm loosely following to map out editor features.
