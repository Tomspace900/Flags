import Country from '#models/country'
import type { HttpContext } from '@adonisjs/core/http'

export default class CountriesController {
  async index({ response }: HttpContext) {
    const countries = await Country.all()
    return response.json(countries)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['codeIso', 'name'])
    const country = await Country.create(data)
    return response.json(country)
  }

  async seed({ request, response }: HttpContext) {
    const data = request.only(['countries'])
    let countriesCreated = []
    for (const countryData of data.countries) {
      const existingCountry = await Country.findBy('codeIso', countryData.codeIso)
      if (!existingCountry) {
        const countryCreated = await Country.create(countryData)
        console.log('Country created:', countryCreated)
        countriesCreated.push(countryCreated)
      }
    }
    return response.json(countriesCreated)
  }

  async show({ params, response }: HttpContext) {
    const country = await Country.findOrFail(params.id)
    return response.json(country)
  }

  async update({ params, request, response }: HttpContext) {
    const country = await Country.findOrFail(params.id)
    const data = request.only(['codeIso', 'name'])
    country.merge(data)
    await country.save()
    return response.json(country)
  }

  async destroy({ params, response }: HttpContext) {
    const country = await Country.findOrFail(params.id)
    await country.delete()
    return response.json({ message: 'Country deleted successfully' })
  }
}
