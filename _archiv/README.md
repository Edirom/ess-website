# How to set up the program for the ESS

## Folder structure
- Create a folder with the year.
- In this folder, you need the following subfolders:
  - `classes` – for the course description
  - `img` – for the weekly schedule which should uploaded both as .pdf and .png
  - `formTemplates` – for managing interaction with the registration form
- In the year-folder you need the following files:
  - `programm.html` – providing the program page
  - `registrierung.html` – providing the registration page
  - `formmail.php` – providing the PHP script for the registration form for 
    sending emails and storing the data in a file on the server

 
## What's in the file `programm.html`
The HTML file should consist of two parts, a metadata head and the actual text 
body.

### Metadata head

    ---
    layout: program
    title: "Kursprogramm ESS 20XX"
    programm_pdf: /2025/img/ESS20XX-Programm.pdf
    programm_img: /2025/img/ESS20XX-Programm.png
    ---
    
    
### Text body

```html
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
```
    

## How to set up a course

The HTML file should consist of two parts, a metadata head and the actual text 
body.
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

The costs depend on the course length: a slot of 3 hours costs 5 Euros.


The slots are set up in `_data/timeslots/[year].yml`.

### Text body
Under the metadata header needs to be this text body with the actual description.

```html
<div class="content">
  <p>This is the first paragraph with the description of the fancy course.</p>
  <p>The description can be even more fancy if you add links to <a href="https://www.fancy-website.de/" title="Fancy Website" target="_blank">websites</a>.</p>
</div>
```
