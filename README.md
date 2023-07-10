# mooneyFaces

This task presents a randomized array of 48 images of faces; half of the faces are upright and half are inverted.

The participant is prompted to respond whether the image present was or was not a face, within 5 seconds.

The Silverstein version adds 2 additional ratings:
    1) whether the face appears to be an adult or child, and
    2) whether the face appears to be more masculine or more feminine;
should the participant identifies an image as a face, regardless of its ground truth (upright or inverted).

The Silverstein version also adds 10 inverted and 10 upright catch images which should never be construed as a face.

The total administration time should last no longer than 15 minutes. 

## Installation:

Once you have cloned the repository to your webroot, adjust the permissions to allow access to the source code and folder for data saving:
    
    sudo chmod -R 755 mooneyFaces/
    sudo chmod -R 777 mooneyFaces/data

## Scroing:

Once you have collected data, you will see data populated inside of `data/`

1. Open the `mooneyFaces/` repository in Finder (MacOS) or File Explorer (Windows) and double click mooneyFaces.Rproj
2. Run `scripts/scoring.R`

A new data frame `mooney_clean` will be created and a csv of that data frame will be exported to `output/mooney_clean.csv`


