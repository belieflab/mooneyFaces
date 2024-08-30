# Mooney Faces (mooney)

```
git clone --recurse-submodules -j4 git@github.com:belieflab/mooneyFaces.git && cd mooneyFaces && git submodule foreach --recursive 'git checkout $(git config -f $toplevel/.gitmodules submodule.$name.branch || echo main)' && git update-index --assume-unchanged exp/conf.js
```

## Overview 

In this task, participants will view a randomized array of 48 black and white images, half of which are upright faces and the other half inverted. Participants must decide whether they think each image is a face. Pressing ‘0’ for "not a face" & Pressing ‘1’ for "face." Responses must be made within 5 seconds.

For images identified as faces, participants will also make two additional "forced choice" ratings:

- Does the face appear to be an adult or a child?
- Does the face appear more masculine or more feminine?

Note: Participants must use the numbers at the top of the keyboard, not the number pad.

Approximate Run Time: The task will last no longer than 15 minutes, including a break.

This is the Silverstein version - it includes an additional 20 catch images (10 inverted and 10 upright) that should never be construed as faces.
