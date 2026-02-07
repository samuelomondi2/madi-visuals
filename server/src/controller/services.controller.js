const servicesService = require("../services/services.service");

exports.createService = async (req, res, next) => {
  try {
    const id = await servicesService.createService(req.body);
    res.status(201).json({ message: "Service created", id });
  } catch (err) {
    next(err);
  }
};

exports.getServices = async (req, res, next) => {
  try {
    const services = await servicesService.getServices();
    res.json(services);
  } catch (err) {
    next(err);
  }
};

exports.getServiceById = async (req, res, next) => {
  try {
    const service = await servicesService.getServiceById(req.params.id);
    res.json(service);
  } catch (err) {
    next(err);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    await servicesService.updateService(req.params.id, req.body);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    await servicesService.deleteService(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
