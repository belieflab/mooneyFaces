# Mooney Faces (mooney)

Participants will see black and white images and decide whether they think the image is a face. They will press 0 if they think it is not a face and 1 if they do. *Note:* Participants cannot use their number pad for this task; they must use thenumbers at the toip of the keyboard.

Approximate Runtime: 8 minutes for original version., 10 miutes for silverstein version


## Getting Started
### Clone the Repository
```
git clone --recurse-submodules -j4 git@github.com:belieflab/mooneyFaces.git && cd mooneyFaces && git submodule foreach --recursive 'git checkout $(git config -f $toplevel/.gitmodules submodule.$name.branch || echo main)' && git update-index --assume-unchanged exp/conf.js
```

## Overview 
This task contains two versions in one: Original and Silverstein. Each comes with its own timeline and variable set. 

Both versions involve a task that presents a randomized array of 48 images of faces; half of the faces are upright and half are inverted. The participant is prompted to respond whether the image present was or was not a face, within 5 seconds. The total administration time should last no longer than 15 minutes.

There are two differences between the versions. 

Firstly, silverstein adds 2 additional "forced choice" ratings. If the participant identifies an image as a face, regardless of its ground truth (upright or inverted), they then must say (1) whether the face appears to be an adult or child, and (2) whether the face appears to be more masculine or more feminine.

Secondly, silverstein version adds 10 inverted and 10 upright catch images which should never be construed as a face.

To select a version, go to the `exp/conf.js` file. Identify the version variable. And finally, comment out the version you do not wish to use by putting two slashes in front of the line of code. Make sure the version you DO want to use does not have those slashes. For example, suppose you wanted the original version. Your conf.js should have these lines:

```
// const version = "silverstein";
const version = "original";
```
