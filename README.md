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

#### Install and configure XAMPP:
1. [Download XAMPP](https://www.apachefriends.org/download.html) with PHP version 7.3.19 (try to stick with PHP version 7.x.x)
2. Open XAMPP and click "Start" to boot the XAMPP application.
3. Navigate to "Services" and click "Start All" button.
4. Navigate to "Network", select localhost:8080, and click "Enable".
5. Navigate to "Volumes" and click "Mount".



#### Clone the git repository:
6. Open Terminal and navigate to the htdocs directory:

    Mac/Linux:

        cd ~/.bitnami/stackman/machines/xampp/volumes/root/htdocs
    Windows:

        cd C:\\xampp\\htdocs

7. Remove index.php from htdocs
   
       rm index.php

9. Clone into htdocs:

        git clone --branch silverstein https://github.com/belieflab/mooneyFaces.git

#### Modify permissions (Mac / Linux only):
8. Copy this text into your terminal from the htdocs folder (the folder you are already in).

        sudo chmod -R 777 mooneyFaces/

This adjusts the permissions to allow access to the source code and folder for data saving.
        
#### Start experiment:
Depending on your XAMPP installation, the experiment may be hosted over 80 or 8080.     
9. Click this URL: [http://localhost:80/mooneyFaces](http://localhost:80/mooneyFaces)
10. Click this URL: [http://localhost:8080/mooneyFaces](http://localhost:8080/mooneyFaces)



## Scoring:

Once you have collected data, you will see data populated inside of `data/`

1. Open the `mooneyFaces/` repository in Finder (MacOS) or File Explorer (Windows) and double click mooneyFaces.Rproj
2. Run `scripts/scoring.R`

A new data frame `mooney_clean` will be created and a csv of that data frame will be exported to `output/mooney_clean.csv`


