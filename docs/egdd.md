---

waltz:
title: EGDD Example - Cross the Pond
meta:
version: 0.0.3
edd authors: - Rachel Sison <rsison@udel.edu> - Elizabeth Kalfas <lizzykal@udel.edu>

---

# Cross the Pond

# Overview

## Elevator Pitch

You have this cute duck that has been separated from its duck family by a pond. You aim to get to the other side of the pond using the stepping stones.

## Influences (Brief)

-   Index the Cat:
    -   Medium: Game
    -   Explanation: The Index the Cat game immediately advances to the next level once you beat the previous one, which we’re implementing into ours.
-   Crossy Road:
    -   Medium: phone game
    -   Explanation: Our game applies the same concept of getting to the other side.
-   Quick Route:
    -   Medium: iPhone Game
    -   Explanation: The Quick Route game objective is to connect bubbles using the shortest path, which is similar to the objective of our game.

## Core Gameplay Mechanics (Brief)

-   click stones to select a path for your duck
-   click submit to check if the path chosen matches the shortest path
-   pass level when you find the shortest path across
-   if you cannot find the shortest path it will prompt you to try again
-   move on to a higher level when the path is found
-   when all levels are complete show the winner screen

# Learning Aspects

## Learning Domains

Introductory Data Structures

## Target Audiences

-   Students being introduced to graphing algorithms
-   Should be appropriate for adults who are young at heart.

## Target Contexts

-   This would be assigned as supplementary practice in a course formally teaching the Dijksras Algorithm.

## Learning Objectives

-   By the end of the lesson, players will be able to find the shortest path using Dijkstra’s Algorithm

## Prerequisite Knowledge

-   Prior to the game, players need to be able to determine the distance between nodes in a graph
-   Prior to the game, players should have a basic understanding of Dijkstra’s algorithm.

## Assessment Measures

A short pre-test and matching post-test should be designed to assess student learning.

-   Given a graph, calculate the total distance of a path
-   Given a graph, determine the shortest path across
-   Given a graph, determine if a certain node is stopped during the shortest path

# What sets this project apart?

-   Most introductory coding activities focus on code-writing, this can have a cute animal and graphics
-   The gameplay mechanics of having the duck go to each rock to meet the desired goal of identifying the shortest possible path

# Player Interaction Patterns and Modes

## Player Interaction Pattern

This is a game for one person, they click on the mouse to move to different rocks in the pond.

## Player Modes

-   Single-player: You repeatedly advance through rounds and levels until you reach the end.

# Gameplay Objectives

-   Reunite with your family: When the shortest path is found you will be able to get across the pond and reunite with your family
-   Advance to the next level: Once the shortest possible path is found you advance to advance to the next level
-   Complete all the levels: Get through all the levels to win the game.

# Procedures/Actions

You click the mouse through the regions of the screen.

Some of those regions are different nodes representing a graph

# Rules

-   If the player clicks on the wrong rocks thus submitting the wrong path, then the player loses
-   If the player clicks the correct rocks, creating the correct path, then the duck is happily united with a member of its family
    -If the player gets it wrong, they will be given a new path with diffrent values

# Objects/Entities

-   There's a pond with rocks in it.
-   There's a graph implemented using the rocks.
-   Some instructions appear periodically at the bottom of the screen.

## Core Gameplay Mechanics (Detailed)

-   Clicking/selecting rocks: You click/select multiple nodes (rocks) to complete the shortest path possible for the duck to get across the pond. Once the desired rocks are selected, you submit your answer.
-   Correct path: If you correctly select/click the right rocks, essentially submitting the shortest possible path, the duck will be reunited with his happy family. Then the game will advance to the next round, switching up the numbers on the nodes to make it more difficult.
-   Incorrect path: After selecting and submitting a path, if it is incorrect the duck will make a sad face/noise
-   Various levels of increasing difficulty: There will be 5 levels each increasing in difficulty, the first level will just increase the number of nodes(stones) and connections between the nodes, and the last level will require the duck to stop at a certain stone before getting to the other side.
-   All levels complete: After you complete all the levels, it displays a victory message. The ducks will all be together again.

## Feedback

-   Text on the screen shows the current path selected as well as any previous paths submitted
-   If an incorrect path is submitted 3 times a text showing the correct path will pop up.
-   When you advance to a new level, the level text changes
-   When you win the game, the ducks are all united.

# Story and Gameplay

## Presentation of Rules

-   Text shown on the main game screen explains the objective and interaction instructions

## Presentation of Content

The game does not attempt to teach you Dijkstra’s Algorithm. This should be presented as supplementary content to help reinforce the topic.

## Story (Brief)

You are a cute little duck that has been separated from the rest of your duck family on the other side of the pond. To get back across the pond you have to use the stones as steps to find the shortest path back to reunite with your family. After you complete all the levels you win

# Assets Needed

## Aethestics

The aesthetics should be happy and cartoonish. The game should have a light-hearted feel. This should encourage the player to feel okay with their mistakes even as they try to do better.

## Graphical

-   Characters List
    -   Duck
-   Textures: N/A
-   Environment Art/Textures:
    -   Pond:
    -   Stone:

## Audio

-   Music List (Ambient sound)
    -   General gameplay: light cartoonish elevator music type
    -   Duck reunification: cheer/happy quacks
    -   Incorrect path: womp womp

## Story Boards

!(/assets/images/Storyboard1.jpg)
!(/assets/images/Storyboard2.JPG)
