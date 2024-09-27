# 🎭 Mooney Faces Task

Welcome to the Mooney Faces Task! This experiment challenges participants to identify faces in black and white images, testing visual perception and face recognition abilities.

## 🚀 Getting Started

### Clone the Repository
```bash
git clone --recurse-submodules -j4 git@github.com:belieflab/mooneyFaces.git && cd mooneyFaces && git submodule foreach --recursive 'git checkout $(git config -f $toplevel/.gitmodules submodule.$name.branch || echo main)' && git update-index --assume-unchanged exp/conf.js
```

### Stay Updated
When pulling changes, run:
```bash
./sync.sh
```
> 🔄 This ensures all submodules are up-to-date.

> ⚠️ Pulling changes will not remove any data.

## 📊 Task Versions

### Original Version
- 86 images (half upright, half inverted)
- Participants respond whether the image is a face or not
- Approximate runtime: 8 minutes

### Silverstein Version
- 86 main images (half upright, half inverted)
- 20 scrambled images (10 upright, 10 inverted) which act as catch trials
- Additional ratings for perceived age and gender of identified faces
- Approximate runtime: 12 minutes

## 🎯 Task Procedure

### Original Version

1. Participants view black and white images
2. They decide if the image is a face:
   - Press 0 if not a face
   - Press 1 if it is a face
3. Response time: 5 seconds per image

### Silverstin Version

1. Same instructions as original version
2. If they decide the image is a face:
  - Is the face more masculine or more feminine?
  - Is the face a child or an adult?

> ⚠️ Participants must use the numbers at the top of the keyboard, not the number pad

## ⚙️ Configuration

Modify `exp/conf.js` to select the desired version:

```javascript
// Uncomment the version you want to use
const version = "original";
// const version = "silverstein";
```

## 🌐 Online Administration

For platforms like PROLIFIC, CloudResearch, MTurk, or Connect, use:
```
https://web-url-of-your-website.com/study-name/mooneyFaces
```

## 🛠 Development Guide

### Dependencies
- PHP version 8.x
- jsPsych version 7.x

### XAMPP Setup
1. [Download XAMPP](https://www.apachefriends.org/download.html)
2. Start XAMPP and services
3. Clone the repository into htdocs
4. Modify permissions as needed
5. Launch the experiment

## 📈 Output Variables

We're working on including:
- image information (orientation, ground truth)
- version_type

## 🚧 To-Do
- Add detailed scoring metrics for each version

---
🎭 Ready to explore face perception? Let's dive into the world of Mooney faces! 👁️🧠
```
