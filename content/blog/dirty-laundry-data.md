---
title: Scraping Laundry Data
description: Scraping data because why not? I'll find a use for it later.
created: 2025-04-10T00:00:00.000Z
updated: 2025-04-10T00:00:00.000Z
author: Bucky
---

# Scraping Laundry Data

Scraping data because why not? I'll find a use for it later.

## What?

During my first week of college I needed to familiarize myself with the basics of living on campus, and from the basics provided by my college, a laundry room was one of them. Having to do laundry is something everyone does, but my college has some newer technology. IoT laundry machines happen to be a part of this newer technology and as most common fact about IoT devices is they are not secure. But this isn't a hacking tutorial or some finding an exploit in a protocol, but this is a text book case of API scrapping.

Upon my first discovery of the laundry room I found a company logo, service tag, and a QR Code all displayed on it. Upon my first discovery, the machines were IoT and have a website to monitor a single machine at a time. They also do have an app that plays a key role in someone else story, but I have paid no attention to it. These machines are not owned nor created by my college but rather a large company who specializes in this type of machine. They often service laundromats and other college campuses. However, these machines are not particularly smart and can use a couple of hardware changes, which is not the point of this article. The point is the discovery of the website monitoring each machine. I had not logged in or created an account, I had only scanned a QR Code which brought me to a site listing the machine number and the time remaining. Simple yet effective.

Once I returned to my dorm to wait the half hour while the washing machine was running, I pondered and inspected the site for how it was working. Powered by an unauthenticated API and a seemingly bi-minutely Javascript fetch request it was fetching the time remaining. While inspecting the network request I found the API endpoint that provided the data, no protection or authentication. As I inspected this newly found API request and response I noticed the JSON body was long for requesting a single machine. It was not a single machine but rather a lot of 32, the amount present in my dorms laundry room. After grabbing the data over a couple of minutes to merely see what would change I showed my findings with a friend, who would later on give a talk at GrafanaCON stemming my discovery and our shared ideas. Spread over the next couple of weeks I drafted several scripts to scrap the data, and finally landing on one that would suffice. A Perl script, It had been a language I tested because why not? This decision of 'why not?' would become a very common reason in this project, and I am glad for it. The morals of scrapping a public unauthenticated non rate limited API is at the readers discretion, but it was lively data I found interesting enough to use.

I was not the first one to explore this API, in fact my method of discovery only showed me a single endpoint. I reserved my desire to explore it more because I had better things to focus on such as this newly discovered data source and school. During my small amount of research into the company and machines I discovered a news article showing off how a couple of students would give themselves money to do their own laundry on campus, I search more because they were also students and would likely shared their finding publicly. When I found the[ blog article](https://slugsec.ucsc.edu/posts/taking-down-big-laundry/) from the student ran Cybersecurity club at UC Santa Cruz I did not expect a write up about their discovery and exploration of the now patched vulnerability. While I did not find their write up before I had finish drafting my script, I enjoyed the read. To clarify details, I have no intention to share exploits or immoral actions that would cause damage or harm to the company. Only my findings of what data I have can do for me.

## Why?

As I reasoned above, why not?

Why would I not analyze this data to see connections I could make? Why would I not showcase this data in such a way others could benefit from it?

To not find a purpose of this data would be even more pointless than discarding it.

## How?

To start from the top.

I found an IoT machine that had a website that would use data to show the remaining time left on a machine. I inspected the network activity to discover how this website worked. I located an unprotected API that provided data for all machines belonging to the same room. I scrapped the API and saved it to a database.

## Hooooooow?

The longer explanation starts with discovery of the JSON data.

Over a duration of a couple of weeks I inspected the data for common formats and research how I would store it. This data did not seem to fit the usual database format until I found [Timescale](), a Postgresql extension that provided a base and utilities for time series data. Until this website is revised and article updated, there is no pictures or helpful diagrams of the data, only code blocks.

```sql
CREATE TYPE machine_type AS ENUM ('dryer','washer');
CREATE TYPE mode_type AS ENUM ('pressStart','running','idle', 'unknown');

CREATE TABLE IF NOT EXISTS laundry (
    time TIMESTAMPTZ NOT NULL,
    opaqueId UUID NOT NULL,
    locationId UUID NOT NULL,
    roomId varchar(11) NOT NULL,
    nfcId UUID NOT NULL,
    qrCodeId varchar(5) NOT NULL,
    licensePlate varchar(7) NOT NULL,
    stickerNumber smallint NOT NULL,
    type machine_type NOT NULL,

    doorClosed BOOL NOT NULL,
    available BOOL NOT NULL,
    notAvailableReason text,
    mode mode_type NOT NULL,
    timeRemaining smallint,

    settings_soil text,
    settings_cycle text,
    settings_washerTemp text,
    settings_dryerTemp text
);
```

The snippet of SQL above shows the very basic format of data saved to the database. There is no second table or other data. Just a simple table saving all the values from 32 machines. This script was only drafted after seeing all the possible states a machine could be in, since I did not have documentation of the API. I was on my own here. There is a bit extra setup for Timescale but I am in no place to explain how it works. The tools they provide and its respective documentation can be found on their site.

As it stood, I had data but no way to display it in a useful form. That is where Timescale became important, combined with the Hypertable and an extra extension querying the data became easy.

```sql
SELECT
    laundry.stickerNumber,
    last(laundry.time,time) AS time,
    last(laundry.type,time) AS type,
    last(laundry.available,time) AS available,
    last(laundry.notavailablereason,time) AS reason,
    last(laundry.timeremaining,time) AS timeremaning
FROM laundry
    WHERE time > now() - INTERVAL '1 days'
    GROUP BY stickerNumber
    ORDER BY stickerNumber;
```

Timescales solved another problem of time series data. It gave access to several functions that would work well to display and calculate data over time or as the latest frame, as shown above. But this is not just a article about Timescale, it is about data. Data is fun! But data without visualizations is hard to read and understand. This is where Gafana came in. Using timescale it would be able to display the data over time. Such as the following. It is one of many graphs that showcase the data over time. With the power of Grafana I could create graphs showing trends of laundry.

![Grafana laundry graphic](blog/grafana-laundry-showcase.png "Grafana laundry graphic")

Grafana is very powerful in the role it plays. Displaying data and having such a configurable interface to any data source made it the best option. Even if the dashboard is never shared or used. Knowing the data can be displayed in such a way made it a worth while use of the data.


## Outgoing
This is data I scrap, save, and display using technologies that provide free or open source versions. But the point of this article is not to sell these tools, but rather to show the biggest reason to do something is why not? Why not scrap the data? Why not devlop a program for it? Why not create a dashboard for it? Why not work on a project?

To work on a project is to learn. To learn is to grow.
