# How to set up the program and the registration for the ESS

## Folder structure
- Create a folder with the year.
- In this folder, you need the following subfolders:
  - `classes` – for the course description
  - `img` – for the weekly schedule which should uploaded both as .pdf and .png
  - `formTemplates` – for managing interaction with the registration form, s. below
- In the year-folder you need the following files:
  - `programm.html` – providing the program page
  - `registrierung.html` – providing the registration page, s. below
  - `formmail.php` – providing the PHP script for the registration form for 
    sending emails and storing the data in a file on the server, s. below

 
## What's in the file `programm.html`
The HTML file should consist of two parts, a metadata header and the actual 
text body.

### Metadata header

```yaml
---
layout: program
title: "Kursprogramm ESS 20XX"
programm_pdf: /20XX/img/ESS20XX-Programm.pdf
programm_img: /20XX/img/ESS20XX-Programm.png
---
```
    
    
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

The HTML file should consist of two parts, a metadata header and the actual 
text body.
First of all, please name the file with a meaningful title.

### Metadata header

```yaml
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
```

The costs depend on the course length: a slot of 3 hours costs 5 Euros.
The slots are set up in `_data/timeslots/[year].yml`.

If a course is fully booked add 
```yaml
full: true
```
after the timeslots.

### Text body
Under the metadata header needs to be this text body with the actual description.

```html
<div class="content">
  <p>This is the first paragraph with the description of the fancy course.</p>
  <p>The description can be even more fancy if you add links to <a href="https://www.fancy-website.de/" title="Fancy Website" target="_blank">websites</a>.</p>
</div>
```

### How to open the registration
- Add and update the autoresponse form `_archiv/[year]/formTemplates/autorespond.txt`
- Add the autoresponse form `_archiv/[year]/formTemplates/form_bad.html` and `_archiv/[year]/formTemplates/form_ok.html` – technically they don’t need any adaption 
- Copy the formmail script for the specific year `_archiv/[year]/formmail.php` and adapt the `$TEMPLATEDIR` variable to the correct year `/var/www/html/[year]/formTemplates`
- Adapt `_includes/registration-form.html` if necessary
- Add the dates of the registration to the program `_archiv/[year]/programm.html`
- Add file and configure the variables in the header `_archiv/[year]/registrierung.html`
- Add registration to navigation `_data/navigation.yml` with correct slug
- Update `entrypoint.sh` with correct year for CAPTCHA keys
- Switch to the Apache Dockerfile for PHP support
- Switch back to nginx Dockerfile after registration is closed again. This can be done in `.github/workflows/docker-publish.yml`.

