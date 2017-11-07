 #!/usr/bin/env python
# Name: Daan Uittenhout	
# Student number:	11057777
# '''
# This script scrapes IMDB and outputs a CSV file with highest rated tv series.
# '''
import os, sys; sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))

from pattern.web import URL, DOM, plaintext
from pattern.web import NODE, TEXT, COMMENT, ELEMENT, DOCUMENT
from pattern.web import abs
import csv
from pattern.en import tokenize
from pattern.web import URL, DOM

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

titles = []
ratings = []
genres = []
runtimes = []
actors = []
amount_series = 50

def extract_tvseries(dom):

	
	# itterate over the items in the list of series
	for serie in dom.by_tag("div.lister-item")[:amount_series]:
		
		# itterate over elemets with a tag a and append them to the list of titles
		for element in serie.by_tag("a")[1:2]:
			# check if the string is not empty
			if (element.content == ""):
					title = "no data"
			else:
				# ignore the encoding if it isn'ascii
				title = element.content.encode('ascii', 'ignore').decode('ascii')
			titles.append(title)
			
		# itterate over elemets in the class ratings and append them to the list of ratings	
		for element in serie.by_class("ratings-imdb-rating"):
			# check if the string is not empty
			if (element.content == None):
					rating = "no data"
			else:
				rating = element.attrs.get("data-value")
			ratings.append(rating)
			
		# itterate over elemets in the first paragraph, select runtime and append them to the list of runtimes
		# itterate over elemets in the first paragraph, select genre and append them to the list of genres
		# check if the string is not empty
		for element in serie.by_tag("p")[0].by_tag("span"):	
			if (element.attrs.get("class") == "runtime"):
				if (element.content == ""):
					runtime = "no data"
				else:
					runtime = element.content[:-4]
				runtimes.append(runtime)
			if (element.attrs.get("class") == "genre"):
				if (element.content == ""):
					runtime = "no data"
				else:
					genre = element.content[1:30]
				genres.append(genre)
		
		# create a string to add the different actors to
		actors1 = ""
		# itterate over elemets in the third paragraph, select genre and append them to the list of genres
		for element in serie.by_tag("p")[2].by_tag("a"):
			# check if the string is not empty
			if (element.content == ""):
				actor = "no data"
			# ignore the encoding if it isn'ascii
			actor = element.content.encode('ascii', 'ignore').decode('ascii')
			actors1 += actor + ", "
		actors.append(actors1[0:-2])
	# return the list categories
	return [titles, ratings, genres, actors, runtimes]  


def save_csv(f, tvseries):
    # Output a CSV file containing highest rated TV-series.
	writer = csv.writer(f)
	writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])
	b = 0
	# itterate over the list categories and write the row with the first element of them
	for header in tvseries:
		for element in header:
			writer.writerow([titles[b], ratings[b], genres[b], actors[b], runtimes[b]])			
			b += 1
			if b == amount_series:
				return 0


if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)