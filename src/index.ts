import './scss/styles.scss';

import { AppData } from './components/AppData';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/Page';
import { Card } from './components/Card';
import { AppApi } from './components/AppAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { Product } from './components/base/Model';
import { Modal } from './components/common/Modal';
import { Cart } from './components/Cart';


const events = new EventEmitter();
const api = new AppApi(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardCartTemplate = ensureElement<HTMLTemplateElement>('#card-basket')
const cartTemplate = ensureElement<HTMLTemplateElement>('#basket');
const deliveryTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const appData = new AppData({}, events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const cart = new Cart(cloneTemplate(cartTemplate), events);


events.on('catalog:changed', () => {
    page.catalog = appData.catalog.map(item => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), {
            action: () => events.emit('card:selected', item)
        });
        console.log(item);
        return card.render({
            title: item.title,
            image: item.image,
            price: item.price,
            category: item.category
        })
    });
});

events.on('card:selected', (item: Product) => {
    appData.setPreview(item);
});

events.on('preview:changed', (item: Product) => {
    const card = new Card(cloneTemplate(cardPreviewTemplate), {
        action: () => {
            events.emit('product:toggle', item);
            card.buttonTitle = (appData.cart.indexOf(item) < 0) ? 'Купить' : 'Удалить из корзины'
        }
    });
    modal.render({
        content: card.render({
            title: item.title,
            description: item.description,
            image: item.image,
            price: item.price,
            category: item.category,
            buttonTitle: (appData.cart.indexOf(item) < 0) ? 'Купить' : "Удалить из корзины"
        })
    });
});

events.on('product:toggle', (item: Product) => {
    if (appData.cart.indexOf(item) < 0) {
        events.emit('product:add', item);
    }
    else {
        events.emit('product:delete', item);
    }
});

events.on('product:add', (item: Product) => appData.addToCart(item));
  
events.on('product:delete', (item: Product) => appData.removeFromCart(item));

events.on('cart:changed', (items: Product[]) => {
    cart.items = items.map((item, index) => {
        const card = new Card(cloneTemplate(cardCartTemplate), {
            action: () => events.emit('product:delete', item)
        });
        return card.render({
            index: (index + 1).toString(),
            title: item.title,
            price: item.price,
        })
    })
    const total = items.reduce((total, item) => total + item.price, 0)
    cart.total = total
    appData.order.total = total;
    cart.toggleButton(total === 0);
  })
  
events.on('counter:changed', () => {
    page.counter = appData.cart.length;
});

events.on('cart:open', () => {
    modal.render({
        content: cart.render({})
    })
});

api.getProductList()
    .then(appData.setCatalog.bind(appData))
    .catch(err => console.log(err));

