# How to set up the program for the ESS

## Folder structure
- Create a folder with the year.
- In this folder you need the following folders:
  - `classes` – for the course description
  - `img` – for the weekly schedule which should uploaded both as .pdf and .png
  - `formTemplates` – for managing interaction with the registration form
- In the year-folder you need the following files:
  - `programm.html` – providing the program page
  - `registrierung.html` – providing the registration page
  - `formmail.php` – providing the actuel process of registrating

 
## What's in the file `programm.html`
The html file should consist of two parts, a metadata head and the actual text body.

### Metadata head

    ---
    layout: program
    title: "Kursprogramm ESS 20XX"
    programm_pdf: /2025/img/ESS20XX-Programm.pdf
    programm_img: /2025/img/ESS20XX-Programm.png
    ---
    
    
### Text body

    <div>
      <div class="row justify-content-center">
          <div class="col">
              <p>Kursangebot zur XX. Edirom-Summer-School</p>
              <p>Die Anmeldephase findet <b>vom XX. Juli bis zum XX. August</b> statt.</p>
              <p>Weitere Informationen folgen hier. Die Programme der vergangenen
                  Jahrgänge sind im <a href="{{ '/archiv.html' | relative_url }}">Archiv</a> zu finden.</p>
          </div>
      </div>
          
      {% include program-list.html %}
      
  </div>
    

## How to set up a course

The html file should consist of two parts, a metadata head and the actual text body.
First of all, please name the file with a meaningful title.

### Metadata head

    ---
    title: Fancy course on important stuff
    title-short: Fancy course
    label: fancy
    lang: Deutsch oder English
    costs: 20
    teachers: Awesome teacher
    requirements:
    - basic knowledge of stuff
    software:
    - average software
    target-audience: Beginners
    slots:
    - Mi1
    - Mi2
    - Mi3
    - Mi4
    room: tba
    ---

The costs depend on the courses length: a slot of 3 hours costs 5 Euros.


The slots are set up in `_data/timeslots/[year].yml`.

### Text body

    <div class="content">
    <p>Description of the fancy course.</p>
    
    </div>

