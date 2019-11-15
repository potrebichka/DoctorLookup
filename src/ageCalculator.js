import { lifeExpectancy } from '../src/lifeExpectancy';

export class AgeCalculator {
    constructor(date, sex, country) {
        this.birthday = date;
        this.numberOfDays = (new Date() >= date) ? parseInt((new Date().getTime() - date.getTime())/(1000*3600*24)) : null;
        this.sex = sex;
        this.country = country;
    }

    getAge(orbitPeriod) {
        if (this.numberOfDays || this.numberOfDays === 0) {
            return parseInt(this.numberOfDays / orbitPeriod);
        }
        return "You haven't born yet";
    }

    getEarthAge() {
        const earthOrbitPeriod = 365.26;
        return this.getAge(earthOrbitPeriod);
    }

    getMercuryAge() {
        const mercuryOrbitPeriod = 87.97;
        return this.getAge(mercuryOrbitPeriod);
    }

    getVenusAge() {
        const venusOrbitPeriod = 224.7;
        return this.getAge(venusOrbitPeriod);
    }

    getMarsAge() {
        const marsOrbitPeriod = 1.8808476*365.26;
        return this.getAge(marsOrbitPeriod);
    }

    getJupiterAge() {
        const jupiterOrbitPeriod = 11.862615*365.26;
        return this.getAge(jupiterOrbitPeriod);
    }

    getSaturnAge() {
        const saturnOrbitPeriod = 29.447498*365.26;
        return this.getAge(saturnOrbitPeriod);
    }

    getUranusAge() {
        const uranusOrbitPeriod = 84.016846*365.26;
        return this.getAge(uranusOrbitPeriod);
    }

    getNeptuneAge() {
        const neptuneOrbitPeriod = 164.79132*365.26;
        return this.getAge(neptuneOrbitPeriod);
    }

    getPlutoAge() {
        const plutoOrbitPeriod = 247.92065*365.26;
        return this.getAge(plutoOrbitPeriod);
    }

    getStatistic() {
        const statistic = lifeExpectancy(this.sex, this.country);
        if (this.getEarthAge() === "You haven't born yet") {
            return statistic;
        }
        return statistic - (this.numberOfDays / 365.26);
    }

    getLifeExpectEarth() {
        return parseInt(this.getStatistic());
    }

    getLifeExpectMercury() {
        const mercuryOrbitPeriod = 87.97;
        const earthOrbitPeriod = 365.26;
        return parseInt(this.getStatistic() * earthOrbitPeriod / mercuryOrbitPeriod);
    }

    getLifeExpectVenus() {
        const venusOrbitPeriod = 224.7;
        const earthOrbitPeriod = 365.26;
        return parseInt(this.getStatistic() * earthOrbitPeriod / venusOrbitPeriod);
    }

    getLifeExpectMars() {
        const marsOrbitPeriod = 1.8808476*365.26;
        const earthOrbitPeriod = 365.26;
        return parseInt(this.getStatistic() * earthOrbitPeriod / marsOrbitPeriod);
    }

    getLifeExpectJupiter() {
        const jupiterOrbitPeriod = 11.862615*365.26;
        const earthOrbitPeriod = 365.26;
        return parseInt(this.getStatistic() * earthOrbitPeriod / jupiterOrbitPeriod);
    }

    getLifeExpectSaturn() {
        const saturnOrbitPeriod = 29.447498*365.26;
        const earthOrbitPeriod = 365.26;
        return parseInt(this.getStatistic() * earthOrbitPeriod / saturnOrbitPeriod);
    }

    getLifeExpectUranus() {
        const uranusOrbitPeriod = 84.016846*365.26;
        const earthOrbitPeriod = 365.26;
        return parseInt(this.getStatistic() * earthOrbitPeriod / uranusOrbitPeriod);
    }

    getLifeExpectNeptune() {
        const neptuneOrbitPeriod = 164.79132*365.26;
        const earthOrbitPeriod = 365.26;
        return parseInt(this.getStatistic() * earthOrbitPeriod / neptuneOrbitPeriod);
    }

    getLifeExpectPluto() {
        const plutoOrbitPeriod = 247.92065*365.26;
        const earthOrbitPeriod = 365.26;
        return parseInt(this.getStatistic() * earthOrbitPeriod / plutoOrbitPeriod);
    }
}