# Firefox_ASNSI_EXS

Digital data management (Firefox EX).
 
## Cloud API

```bash
https://www.npoint.io/
```

## Usage getBlockedRedirect

```
[
  {
    "id": 1,
    "currently": "http://www.example.fr/",
    "pushing": "https://asnsi.com/"
  },
  {
    "id": 2,
    "currently": "https://www.google.com/",
    "pushing": "https://www.google.fr/"
  }
]
```

## Usage getAllowedWebSite

```
[
  {
    "id": 1,
    "allowed": "website.com"
  },
  {
    "id": 2,
    "allowed": "website.fr"
  }
]
```

## Usage getBlockedHostKeyWords

```
[
  {
    "id": 1,
    "read": "porn",
    "recommended": "https://asnsi.io/"
  },
  {
    "id": 2,
    "read": "example",
    "recommended": "https://asnsi.io/"
  }
]
```

## Usage getBlockedSlugKeyWords

```
[
  {
    "id": 1,
    "rslug": "forex",
    "URL": "https://asnsi.io/"
  },
  {
    "id": 2,
    "rslug": "good",
    "URL": "https://asnsi.io/"
  }
]
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
