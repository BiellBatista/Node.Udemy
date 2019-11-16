'use strict';

const OrderHook = (exports = module.exports = {});

OrderHook.updateValues = async model => {
  //criando propriedade (virtual) de exibição
  model.$sideLoaded.subtotal = await model.items().getSum('subtotal');
  //somando a quantidade de produtos
  model.$sideLoaded.qty_items = await model.items().getSum('quantity');
  model.$sideLoaded.discount = await model.discounts().getSum('discount');
  //posso chamar o campo total, porque tenho ele na minha tabela
  model.total = model.$sideLoaded.subtotal - model.$sideLoaded.discount;
};

OrderHook.updateCollectionValues = async models => {
  for (let model of models) {
    model = await OrderHook.updateValues(model);
  }
};
