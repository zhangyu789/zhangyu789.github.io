// --- 词汇数据 ---
const vocabulary = [
    // 水果 (fruits) - 27
    { id: 'apple', english: 'apple', chinese: '苹果', phonetic: '/ˈæp.əl/', themeId: 'fruits', imageUrl: '/images/fruits/apple.png', example: 'I eat an apple.' },
    { id: 'banana', english: 'banana', chinese: '香蕉', phonetic: '/bəˈnænə/', themeId: 'fruits', imageUrl: '/images/fruits/banana.png', example: 'The banana is yellow.' },
    { id: 'orange', english: 'orange', chinese: '橙子', phonetic: '/ˈɔːr.ɪndʒ/', themeId: 'fruits', imageUrl: '/images/fruits/orange.png', example: 'I like orange juice.' },
    { id: 'grape', english: 'grape', chinese: '葡萄', phonetic: '/ɡreɪp/', themeId: 'fruits', imageUrl: '/images/fruits/grape.png', example: 'Grapes are sweet.' },
    { id: 'strawberry', english: 'strawberry', chinese: '草莓', phonetic: '/ˈstrɔː.bər.i/', themeId: 'fruits', imageUrl: '/images/fruits/strawberry.png', example: 'Strawberries are red.' },
    { id: 'watermelon', english: 'watermelon', chinese: '西瓜', phonetic: '/ˈwɔː.tər.mel.ən/', themeId: 'fruits', imageUrl: '/images/fruits/watermelon.png', example: 'Watermelon is juicy.' },
    { id: 'pear', english: 'pear', chinese: '梨', phonetic: '/per/', themeId: 'fruits', imageUrl: '/images/fruits/pear.png', example: 'The pear is sweet.' },
    { id: 'peach', english: 'peach', chinese: '桃子', phonetic: '/piːtʃ/', themeId: 'fruits', imageUrl: '/images/fruits/peach.png', example: 'Peaches are soft.' },
    { id: 'cherry', english: 'cherry', chinese: '樱桃', phonetic: '/ˈtʃer.i/', themeId: 'fruits', imageUrl: '/images/fruits/cherry.png', example: 'Cherries are small.' },
    { id: 'pineapple', english: 'pineapple', chinese: '菠萝', phonetic: '/ˈpaɪn.æp.əl/', themeId: 'fruits', imageUrl: '/images/fruits/pineapple.png', example: 'Pineapple is tropical.' },
    { id: 'mango', english: 'mango', chinese: '芒果', phonetic: '/ˈmæŋ.ɡoʊ/', themeId: 'fruits', imageUrl: '/images/fruits/mango.png', example: 'Mango is delicious.' },
    { id: 'kiwi', english: 'kiwi', chinese: '猕猴桃', phonetic: '/ˈkiː.wi/', themeId: 'fruits', imageUrl: '/images/fruits/kiwi.png', example: 'Kiwi is green inside.' },
    { id: 'lemon', english: 'lemon', chinese: '柠檬', phonetic: '/ˈlem.ən/', themeId: 'fruits', imageUrl: '/images/fruits/lemon.png', example: 'Lemon is sour.' },
    { id: 'lime', english: 'lime', chinese: '青柠', phonetic: '/laɪm/', themeId: 'fruits', imageUrl: '/images/fruits/lime.png', example: 'Lime is green.' },
    { id: 'coconut', english: 'coconut', chinese: '椰子', phonetic: '/ˈkoʊ.kə.nʌt/', themeId: 'fruits', imageUrl: '/images/fruits/coconut.png', example: 'Coconut has milk.' },
    { id: 'avocado', english: 'avocado', chinese: '牛油果', phonetic: '/ˌæv.əˈkɑː.doʊ/', themeId: 'fruits', imageUrl: '/images/fruits/avocado.png', example: 'Avocado is healthy.' },
    { id: 'blueberry', english: 'blueberry', chinese: '蓝莓', phonetic: '/ˈbluː.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/blueberry.png', example: 'Blueberries are tiny.' },
    { id: 'blackberry', english: 'blackberry', chinese: '黑莓', phonetic: '/ˈblæk.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/blackberry.png', example: 'Blackberries are dark.' },
    { id: 'raspberry', english: 'raspberry', chinese: '覆盆子', phonetic: '/ˈræz.ber.i/', themeId: 'fruits', imageUrl: '/images/fruits/raspberry.png', example: 'Raspberries are red.' },
    { id: 'plum', english: 'plum', chinese: '李子', phonetic: '/plʌm/', themeId: 'fruits', imageUrl: '/images/fruits/plum.png', example: 'Plums are purple.' },
    { id: 'apricot', english: 'apricot', chinese: '杏', phonetic: '/ˈeɪ.prɪ.kɑːt/', themeId: 'fruits', imageUrl: '/images/fruits/apricot.png', example: 'Apricots are orange.' },
    { id: 'fig', english: 'fig', chinese: '无花果', phonetic: '/fɪɡ/', themeId: 'fruits', imageUrl: '/images/fruits/fig.png', example: 'Figs are sweet.' },
    { id: 'pomegranate', english: 'pomegranate', chinese: '石榴', phonetic: '/ˈpɑː.mɪ.ɡræn.ɪt/', themeId: 'fruits', imageUrl: '/images/fruits/pomegranate.png', example: 'Pomegranate has seeds.' },
    { id: 'papaya', english: 'papaya', chinese: '木瓜', phonetic: '/pəˈpaɪ.ə/', themeId: 'fruits', imageUrl: '/images/fruits/papaya.png', example: 'Papaya is tropical.' },
    { id: 'cantaloupe', english: 'cantaloupe', chinese: '哈密瓜', phonetic: '/ˈkæn.tə.loʊp/', themeId: 'fruits', imageUrl: '/images/fruits/cantaloupe.png', example: 'Cantaloupe is sweet.' },
    { id: 'honeydew', english: 'honeydew', chinese: '蜜瓜', phonetic: '/ˈhʌn.i.duː/', themeId: 'fruits', imageUrl: '/images/fruits/honeydew.png', example: 'Honeydew is green.' },
    { id: 'grapefruit', english: 'grapefruit', chinese: '柚子', phonetic: '/ˈɡreɪp.fruːt/', themeId: 'fruits', imageUrl: '/images/fruits/grapefruit.png', example: 'Grapefruit is citrus.' },
    // 动物 (animals) - 40
    { id: 'dog', english: 'dog', chinese: '狗', phonetic: '/dɔːɡ/', themeId: 'animals', imageUrl: '/images/animals/dog.png', example: 'Dogs like to play.' },
    { id: 'cat', english: 'cat', chinese: '猫', phonetic: '/kæt/', themeId: 'animals', imageUrl: '/images/animals/cat.png', example: 'The cat is sleeping.' },
    { id: 'tiger', english: 'tiger', chinese: '老虎', phonetic: '/ˈtaɪ.ɡər/', themeId: 'animals', imageUrl: '/images/animals/tiger.png', example: 'The tiger is strong.' },
    { id: 'lion', english: 'lion', chinese: '狮子', phonetic: '/ˈlaɪ.ən/', themeId: 'animals', imageUrl: '/images/animals/lion.png', example: 'The lion is brave.' },
    { id: 'bear', english: 'bear', chinese: '熊', phonetic: '/ber/', themeId: 'animals', imageUrl: '/images/animals/bear.png', example: 'Bears are big.' },
    { id: 'rabbit', english: 'rabbit', chinese: '兔子', phonetic: '/ˈræb.ɪt/', themeId: 'animals', imageUrl: '/images/animals/rabbit.png', example: 'Rabbits hop fast.' },
    { id: 'mouse', english: 'mouse', chinese: '老鼠', phonetic: '/maʊs/', themeId: 'animals', imageUrl: '/images/animals/mouse.png', example: 'The mouse is small.' },
    { id: 'horse', english: 'horse', chinese: '马', phonetic: '/hɔːrs/', themeId: 'animals', imageUrl: '/images/animals/horse.png', example: 'Horses run fast.' },
    { id: 'cow', english: 'cow', chinese: '奶牛', phonetic: '/kaʊ/', themeId: 'animals', imageUrl: '/images/animals/cow.png', example: 'Cows give milk.' },
    { id: 'pig', english: 'pig', chinese: '猪', phonetic: '/pɪɡ/', themeId: 'animals', imageUrl: '/images/animals/pig.png', example: 'Pigs are pink.' },
    { id: 'sheep', english: 'sheep', chinese: '羊', phonetic: '/ʃiːp/', themeId: 'animals', imageUrl: '/images/animals/sheep.png', example: 'Sheep have wool.' },
    { id: 'goat', english: 'goat', chinese: '山羊', phonetic: '/ɡoʊt/', themeId: 'animals', imageUrl: '/images/animals/goat.png', example: 'Goats climb mountains.' },
    { id: 'chicken', english: 'chicken', chinese: '鸡', phonetic: '/ˈtʃɪk.ɪn/', themeId: 'animals', imageUrl: '/images/animals/chicken.png', example: 'Chickens lay eggs.' },
    { id: 'duck', english: 'duck', chinese: '鸭子', phonetic: '/dʌk/', themeId: 'animals', imageUrl: '/images/animals/duck.png', example: 'Ducks swim well.' },
    { id: 'bird', english: 'bird', chinese: '鸟', phonetic: '/bɜːrd/', themeId: 'animals', imageUrl: '/images/animals/bird.png', example: 'Birds can fly.' },
    { id: 'fish', english: 'fish', chinese: '鱼', phonetic: '/fɪʃ/', themeId: 'animals', imageUrl: '/images/animals/fish.png', example: 'Fish live in water.' },
    { id: 'frog', english: 'frog', chinese: '青蛙', phonetic: '/frɔːɡ/', themeId: 'animals', imageUrl: '/images/animals/frog.png', example: 'Frogs jump high.' },
    { id: 'snake', english: 'snake', chinese: '蛇', phonetic: '/sneɪk/', themeId: 'animals', imageUrl: '/images/animals/snake.png', example: 'Snakes are long.' },
    { id: 'turtle', english: 'turtle', chinese: '乌龟', phonetic: '/ˈtɜːr.təl/', themeId: 'animals', imageUrl: '/images/animals/turtle.png', example: 'Turtles are slow.' },
    { id: 'monkey', english: 'monkey', chinese: '猴子', phonetic: '/ˈmʌŋ.ki/', themeId: 'animals', imageUrl: '/images/animals/monkey.png', example: 'Monkeys swing on trees.' },
    { id: 'panda', english: 'panda', chinese: '熊猫', phonetic: '/ˈpæn.də/', themeId: 'animals', imageUrl: '/images/animals/panda.png', example: 'Pandas eat bamboo.' },
    { id: 'koala', english: 'koala', chinese: '考拉', phonetic: '/koʊˈɑː.lə/', themeId: 'animals', imageUrl: '/images/animals/koala.png', example: 'Koalas sleep a lot.' },
    { id: 'kangaroo', english: 'kangaroo', chinese: '袋鼠', phonetic: '/ˌkæŋ.ɡəˈruː/', themeId: 'animals', imageUrl: '/images/animals/kangaroo.png', example: 'Kangaroos hop.' },
    { id: 'giraffe', english: 'giraffe', chinese: '长颈鹿', phonetic: '/dʒəˈræf/', themeId: 'animals', imageUrl: '/images/animals/giraffe.png', example: 'Giraffes are tall.' },
    { id: 'zebra', english: 'zebra', chinese: '斑马', phonetic: '/ˈziː.brə/', themeId: 'animals', imageUrl: '/images/animals/zebra.png', example: 'Zebras have stripes.' },
    { id: 'hippo', english: 'hippo', chinese: '河马', phonetic: '/ˈhɪp.oʊ/', themeId: 'animals', imageUrl: '/images/animals/hippo.png', example: 'Hippos are big.' },
    { id: 'rhino', english: 'rhino', chinese: '犀牛', phonetic: '/ˈraɪ.noʊ/', themeId: 'animals', imageUrl: '/images/animals/rhino.png', example: 'Rhinos have horns.' },
    { id: 'wolf', english: 'wolf', chinese: '狼', phonetic: '/wʊlf/', themeId: 'animals', imageUrl: '/images/animals/wolf.png', example: 'Wolves howl at night.' },
    { id: 'fox', english: 'fox', chinese: '狐狸', phonetic: '/fɑːks/', themeId: 'animals', imageUrl: '/images/animals/fox.png', example: 'Foxes are clever.' },
    { id: 'deer', english: 'deer', chinese: '鹿', phonetic: '/dɪr/', themeId: 'animals', imageUrl: '/images/animals/deer.png', example: 'Deer run fast.' },
    { id: 'squirrel', english: 'squirrel', chinese: '松鼠', phonetic: '/ˈskwɜːr.əl/', themeId: 'animals', imageUrl: '/images/animals/squirrel.png', example: 'Squirrels collect nuts.' },
    { id: 'owl', english: 'owl', chinese: '猫头鹰', phonetic: '/aʊl/', themeId: 'animals', imageUrl: '/images/animals/owl.png', example: 'Owls hunt at night.' },
    { id: 'eagle', english: 'eagle', chinese: '鹰', phonetic: '/ˈiː.ɡəl/', themeId: 'animals', imageUrl: '/images/animals/eagle.png', example: 'Eagles fly high.' },
    { id: 'penguin', english: 'penguin', chinese: '企鹅', phonetic: '/ˈpeŋ.ɡwɪn/', themeId: 'animals', imageUrl: '/images/animals/penguin.png', example: 'Penguins swim well.' },
    { id: 'dolphin', english: 'dolphin', chinese: '海豚', phonetic: '/ˈdɑːl.fɪn/', themeId: 'animals', imageUrl: '/images/animals/dolphin.png', example: 'Dolphins are smart.' },
    { id: 'whale', english: 'whale', chinese: '鲸鱼', phonetic: '/weɪl/', themeId: 'animals', imageUrl: '/images/animals/whale.png', example: 'Whales are huge.' },
    { id: 'shark', english: 'shark', chinese: '鲨鱼', phonetic: '/ʃɑːrk/', themeId: 'animals', imageUrl: '/images/animals/shark.png', example: 'Sharks live in the ocean.' },
    { id: 'octopus', english: 'octopus', chinese: '章鱼', phonetic: '/ˈɑːk.tə.pʊs/', themeId: 'animals', imageUrl: '/images/animals/octopus.png', example: 'Octopus has eight arms.' },
    { id: 'crab', english: 'crab', chinese: '螃蟹', phonetic: '/kræb/', themeId: 'animals', imageUrl: '/images/animals/crab.png', example: 'Crabs walk sideways.' },
    { id: 'butterfly', english: 'butterfly', chinese: '蝴蝶', phonetic: '/ˈbʌt̬.ɚ.flaɪ/', themeId: 'animals', imageUrl: '/images/animals/butterfly.png', example: 'Butterfly has colorful wings.' },
    // ... (rest of the vocabulary data remains the same)
    // 颜色 (colors) - 27
    { id: 'red', english: 'red', chinese: '红色', phonetic: '/red/', themeId: 'colors', imageUrl: '/images/colors/red.png', example: 'The apple is red.' },
    { id: 'blue', english: 'blue', chinese: '蓝色', phonetic: '/bluː/', themeId: 'colors', imageUrl: '/images/colors/blue.png', example: 'The sky is blue.' },
    { id: 'green', english: 'green', chinese: '绿色', phonetic: '/ɡriːn/', themeId: 'colors', imageUrl: '/images/colors/green.png', example: 'The grass is green.' },
    { id: 'yellow', english: 'yellow', chinese: '黄色', phonetic: '/ˈjel.oʊ/', themeId: 'colors', imageUrl: '/images/colors/yellow.png', example: 'The sun is yellow.' },
    { id: 'orange', english: 'orange', chinese: '橙色', phonetic: '/ˈɔːr.ɪndʒ/', themeId: 'colors', imageUrl: '/images/colors/orange.png', example: 'The orange is orange.' },
    { id: 'purple', english: 'purple', chinese: '紫色', phonetic: '/ˈpɜːr.pəl/', themeId: 'colors', imageUrl: '/images/colors/purple.png', example: 'Grapes are purple.' },
    { id: 'pink', english: 'pink', chinese: '粉色', phonetic: '/pɪŋk/', themeId: 'colors', imageUrl: '/images/colors/pink.png', example: 'The flower is pink.' },
    { id: 'brown', english: 'brown', chinese: '棕色', phonetic: '/braʊn/', themeId: 'colors', imageUrl: '/images/colors/brown.png', example: 'The bear is brown.' },
    { id: 'black', english: 'black', chinese: '黑色', phonetic: '/blæk/', themeId: 'colors', imageUrl: '/images/colors/black.png', example: 'The cat is black.' },
    { id: 'white', english: 'white', chinese: '白色', phonetic: '/waɪt/', themeId: 'colors', imageUrl: '/images/colors/white.png', example: 'The snow is white.' },
    { id: 'gray', english: 'gray', chinese: '灰色', phonetic: '/ɡreɪ/', themeId: 'colors', imageUrl: '/images/colors/gray.png', example: 'The rock is gray.' },
    { id: 'silver', english: 'silver', chinese: '银色', phonetic: '/ˈsɪl.vər/', themeId: 'colors', imageUrl: '/images/colors/silver.png', example: 'The coin is silver.' },
    { id: 'gold', english: 'gold', chinese: '金色', phonetic: '/ɡoʊld/', themeId: 'colors', imageUrl: '/images/colors/gold.png', example: 'The ring is gold.' },
    { id: 'beige', english: 'beige', chinese: '米色', phonetic: '/beɪʒ/', themeId: 'colors', imageUrl: '/images/colors/beige.png', example: 'The sand is beige.' },
    { id: 'ivory', english: 'ivory', chinese: '象牙色', phonetic: '/ˈaɪ.vər.i/', themeId: 'colors', imageUrl: '/images/colors/ivory.png', example: 'The piano keys are ivory.' },
    { id: 'cream', english: 'cream', chinese: '奶油色', phonetic: '/kriːm/', themeId: 'colors', imageUrl: '/images/colors/cream.png', example: 'The wall is cream color.' },
    { id: 'maroon', english: 'maroon', chinese: '栗色', phonetic: '/məˈruːn/', themeId: 'colors', imageUrl: '/images/colors/maroon.png', example: 'The sweater is maroon.' },
    { id: 'navy', english: 'navy', chinese: '海军蓝', phonetic: '/ˈneɪ.vi/', themeId: 'colors', imageUrl: '/images/colors/navy.png', example: 'The uniform is navy blue.' },
    { id: 'teal', english: 'teal', chinese: '青色', phonetic: '/tiːl/', themeId: 'colors', imageUrl: '/images/colors/teal.png', example: 'The water is teal.' },
    { id: 'cyan', english: 'cyan', chinese: '蓝绿色', phonetic: '/ˈsaɪ.æn/', themeId: 'colors', imageUrl: '/images/colors/cyan.png', example: 'Cyan is a bright blue.' },
    { id: 'magenta', english: 'magenta', chinese: '品红色', phonetic: '/məˈdʒen.tə/', themeId: 'colors', imageUrl: '/images/colors/magenta.png', example: 'Magenta is a deep pink.' },
    { id: 'fuchsia', english: 'fuchsia', chinese: '紫红色', phonetic: '/ˈfjuː.ʃə/', themeId: 'colors', imageUrl: '/images/colors/fuchsia.png', example: 'Fuchsia is vivid pink.' },
    { id: 'rose', english: 'rose', chinese: '玫瑰色', phonetic: '/roʊz/', themeId: 'colors', imageUrl: '/images/colors/rose.png', example: 'Rose is soft pink.' },
    { id: 'blush', english: 'blush', chinese: '腮红色', phonetic: '/blʌʃ/', themeId: 'colors', imageUrl: '/images/colors/blush.png', example: 'Blush is light pink.' },
    { id: 'cherry', english: 'cherry', chinese: '樱桃色', phonetic: '/ˈtʃer.i/', themeId: 'colors', imageUrl: '/images/colors/cherry.png', example: 'Cherry is bright red.' },
    { id: 'rust', english: 'rust', chinese: '铁锈色', phonetic: '/rʌst/', themeId: 'colors', imageUrl: '/images/colors/rust.png', example: 'Rust is reddish-brown.' },
    // 数字 (numbers) - 31
    { id: 'zero', english: 'zero', chinese: '零', phonetic: '/ˈzɪr.oʊ/', themeId: 'numbers', imageUrl: '/images/numbers/zero.png', example: 'Zero means nothing.' },
    { id: 'one', english: 'one', chinese: '一', phonetic: '/wʌn/', themeId: 'numbers', imageUrl: '/images/numbers/one.png', example: 'I have one apple.' },
    { id: 'two', english: 'two', chinese: '二', phonetic: '/tuː/', themeId: 'numbers', imageUrl: '/images/numbers/two.png', example: 'I see two cats.' },
    { id: 'three', english: 'three', chinese: '三', phonetic: '/θriː/', themeId: 'numbers', imageUrl: '/images/numbers/three.png', example: 'There are three birds.' },
    { id: 'four', english: 'four', chinese: '四', phonetic: '/fɔːr/', themeId: 'numbers', imageUrl: '/images/numbers/four.png', example: 'I have four books.' },
    { id: 'five', english: 'five', chinese: '五', phonetic: '/faɪv/', themeId: 'numbers', imageUrl: '/images/numbers/five.png', example: 'Five fingers on my hand.' },
    { id: 'six', english: 'six', chinese: '六', phonetic: '/sɪks/', themeId: 'numbers', imageUrl: '/images/numbers/six.png', example: 'Six legs on an insect.' },
    { id: 'seven', english: 'seven', chinese: '七', phonetic: '/ˈsev.ən/', themeId: 'numbers', imageUrl: '/images/numbers/seven.png', example: 'Seven days in a week.' },
    { id: 'eight', english: 'eight', chinese: '八', phonetic: '/eɪt/', themeId: 'numbers', imageUrl: '/images/numbers/eight.png', example: 'Eight legs on a spider.' },
    { id: 'nine', english: 'nine', chinese: '九', phonetic: '/naɪn/', themeId: 'numbers', imageUrl: '/images/numbers/nine.png', example: 'Nine planets in our system.' },
    { id: 'ten', english: 'ten', chinese: '十', phonetic: '/ten/', themeId: 'numbers', imageUrl: '/images/numbers/ten.png', example: 'Ten toes on my feet.' },
    { id: 'eleven', english: 'eleven', chinese: '十一', phonetic: '/ɪˈlev.ən/', themeId: 'numbers', imageUrl: '/images/numbers/eleven.png', example: 'Eleven players on a team.' },
    { id: 'twelve', english: 'twelve', chinese: '十二', phonetic: '/twelv/', themeId: 'numbers', imageUrl: '/images/numbers/twelve.png', example: 'Twelve months in a year.' },
    { id: 'thirteen', english: 'thirteen', chinese: '十三', phonetic: '/ˌθɜːrˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/thirteen.png', example: 'Thirteen is a teen number.' },
    { id: 'fourteen', english: 'fourteen', chinese: '十四', phonetic: '/ˌfɔːrˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/fourteen.png', example: 'Fourteen days in two weeks.' },
    { id: 'fifteen', english: 'fifteen', chinese: '十五', phonetic: '/ˌfɪfˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/fifteen.png', example: 'Fifteen minutes is a quarter hour.' },
    { id: 'sixteen', english: 'sixteen', chinese: '十六', phonetic: '/ˌsɪksˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/sixteen.png', example: 'Sixteen candles on the cake.' },
    { id: 'seventeen', english: 'seventeen', chinese: '十七', phonetic: '/ˌsev.ənˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/seventeen.png', example: 'Seventeen years old.' },
    { id: 'eighteen', english: 'eighteen', chinese: '十八', phonetic: '/ˌeɪˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/eighteen.png', example: 'Eighteen is adult age.' },
    { id: 'nineteen', english: 'nineteen', chinese: '十九', phonetic: '/ˌnaɪnˈtiːn/', themeId: 'numbers', imageUrl: '/images/numbers/nineteen.png', example: 'Nineteen is almost twenty.' },
    { id: 'twenty', english: 'twenty', chinese: '二十', phonetic: '/ˈtwen.ti/', themeId: 'numbers', imageUrl: '/images/numbers/twenty.png', example: 'Twenty fingers and toes.' },
    { id: 'thirty', english: 'thirty', chinese: '三十', phonetic: '/ˈθɜːr.ti/', themeId: 'numbers', imageUrl: '/images/numbers/thirty.png', example: 'Thirty days in some months.' },
    { id: 'forty', english: 'forty', chinese: '四十', phonetic: '/ˈfɔːr.ti/', themeId: 'numbers', imageUrl: '/images/numbers/forty.png', example: 'Forty hours of work.' },
    { id: 'fifty', english: 'fifty', chinese: '五十', phonetic: '/ˈfɪf.ti/', themeId: 'numbers', imageUrl: '/images/numbers/fifty.png', example: 'Fifty states in America.' },
    { id: 'sixty', english: 'sixty', chinese: '六十', phonetic: '/ˈsɪks.ti/', themeId: 'numbers', imageUrl: '/images/numbers/sixty.png', example: 'Sixty seconds in a minute.' },
    { id: 'seventy', english: 'seventy', chinese: '七十', phonetic: '/ˈsev.ən.ti/', themeId: 'numbers', imageUrl: '/images/numbers/seventy.png', example: 'Seventy years is old age.' },
    { id: 'eighty', english: 'eighty', chinese: '八十', phonetic: '/ˈeɪ.ti/', themeId: 'numbers', imageUrl: '/images/numbers/eighty.png', example: 'Eighty degrees is hot.' },
    { id: 'ninety', english: 'ninety', chinese: '九十', phonetic: '/ˈnaɪn.ti/', themeId: 'numbers', imageUrl: '/images/numbers/ninety.png', example: 'Ninety percent is almost all.' },
    { id: 'hundred', english: 'hundred', chinese: '一百', phonetic: '/ˈhʌn.drəd/', themeId: 'numbers', imageUrl: '/images/numbers/hundred.png', example: 'One hundred cents in a dollar.' },
    { id: 'thousand', english: 'thousand', chinese: '一千', phonetic: '/ˈθaʊ.zənd/', themeId: 'numbers', imageUrl: '/images/numbers/thousand.png', example: 'A thousand years is a millennium.' },
    { id: 'million', english: 'million', chinese: '一百万', phonetic: '/ˈmɪl.jən/', themeId: 'numbers', imageUrl: '/images/numbers/million.png', example: 'A million dollars is a lot.' },
    // 家庭 (family) - 30
    { id: 'father', english: 'father', chinese: '父亲', phonetic: '/ˈfɑː.ðər/', themeId: 'family', imageUrl: '/images/family/father.png', example: 'My father is tall.' },
    { id: 'mother', english: 'mother', chinese: '母亲', phonetic: '/ˈmʌð.ər/', themeId: 'family', imageUrl: '/images/family/mother.png', example: 'My mother is kind.' },
    { id: 'son', english: 'son', chinese: '儿子', phonetic: '/sʌn/', themeId: 'family', imageUrl: '/images/family/son.png', example: 'He is their son.' },
    { id: 'daughter', english: 'daughter', chinese: '女儿', phonetic: '/ˈdɔː.tər/', themeId: 'family', imageUrl: '/images/family/daughter.png', example: 'She is their daughter.' },
    { id: 'brother', english: 'brother', chinese: '兄弟', phonetic: '/ˈbrʌð.ər/', themeId: 'family', imageUrl: '/images/family/brother.png', example: 'My brother is older.' },
    { id: 'sister', english: 'sister', chinese: '姐妹', phonetic: '/ˈsɪs.tər/', themeId: 'family', imageUrl: '/images/family/sister.png', example: 'My sister is younger.' },
    { id: 'grandfather', english: 'grandfather', chinese: '祖父', phonetic: '/ˈɡrænd.fɑː.ðər/', themeId: 'family', imageUrl: '/images/family/grandfather.png', example: 'My grandfather has glasses.' },
    { id: 'grandmother', english: 'grandmother', chinese: '祖母', phonetic: '/ˈɡrænd.mʌð.ər/', themeId: 'family', imageUrl: '/images/family/grandmother.png', example: 'My grandmother bakes cookies.' },
    { id: 'grandson', english: 'grandson', chinese: '孙子', phonetic: '/ˈɡrænd.sʌn/', themeId: 'family', imageUrl: '/images/family/grandson.png', example: 'He is her grandson.' },
    { id: 'granddaughter', english: 'granddaughter', chinese: '孙女', phonetic: '/ˈɡrænd.dɔː.tər/', themeId: 'family', imageUrl: '/images/family/granddaughter.png', example: 'She is his granddaughter.' },
    { id: 'uncle', english: 'uncle', chinese: '叔叔', phonetic: '/ˈʌŋ.kəl/', themeId: 'family', imageUrl: '/images/family/uncle.png', example: 'My uncle tells funny jokes.' },
    { id: 'aunt', english: 'aunt', chinese: '阿姨', phonetic: '/ænt/', themeId: 'family', imageUrl: '/images/family/aunt.png', example: 'My aunt gives me gifts.' },
    { id: 'cousin', english: 'cousin', chinese: '堂/表兄弟姐妹', phonetic: '/ˈkʌz.ən/', themeId: 'family', imageUrl: '/images/family/cousin.png', example: 'I play with my cousin.' },
    { id: 'nephew', english: 'nephew', chinese: '侄子', phonetic: '/ˈnef.juː/', themeId: 'family', imageUrl: '/images/family/nephew.png', example: 'My nephew is small.' },
    { id: 'niece', english: 'niece', chinese: '侄女', phonetic: '/niːs/', themeId: 'family', imageUrl: '/images/family/niece.png', example: 'My niece is cute.' },
    { id: 'husband', english: 'husband', chinese: '丈夫', phonetic: '/ˈhʌz.bənd/', themeId: 'family', imageUrl: '/images/family/husband.png', example: 'He is her husband.' },
    { id: 'wife', english: 'wife', chinese: '妻子', phonetic: '/waɪf/', themeId: 'family', imageUrl: '/images/family/wife.png', example: 'She is his wife.' },
    { id: 'parent', english: 'parent', chinese: '父母', phonetic: '/ˈper.ənt/', themeId: 'family', imageUrl: '/images/family/parent.png', example: 'My parents love me.' },
    { id: 'child', english: 'child', chinese: '孩子', phonetic: '/tʃaɪld/', themeId: 'family', imageUrl: '/images/family/child.png', example: 'The child is playing.' },
    { id: 'baby', english: 'baby', chinese: '婴儿', phonetic: '/ˈbeɪ.bi/', themeId: 'family', imageUrl: '/images/family/baby.png', example: 'The baby is crying.' },
    { id: 'toddler', english: 'toddler', chinese: '幼儿', phonetic: '/ˈtɑːd.lər/', themeId: 'family', imageUrl: '/images/family/toddler.png', example: 'The toddler is learning to walk.' },
    { id: 'teenager', english: 'teenager', chinese: '青少年', phonetic: '/ˈtiːn.eɪ.dʒər/', themeId: 'family', imageUrl: '/images/family/teenager.png', example: 'A teenager goes to high school.' },
    { id: 'adult', english: 'adult', chinese: '成年人', phonetic: '/əˈdʌlt/', themeId: 'family', imageUrl: '/images/family/adult.png', example: 'An adult has a job.' },
    { id: 'friend', english: 'friend', chinese: '朋友', phonetic: '/frend/', themeId: 'family', imageUrl: '/images/family/friend.png', example: 'He is my best friend.' },
    { id: 'neighbor', english: 'neighbor', chinese: '邻居', phonetic: '/ˈneɪ.bər/', themeId: 'family', imageUrl: '/images/family/neighbor.png', example: 'My neighbor is friendly.' },
    { id: 'family', english: 'family', chinese: '家庭', phonetic: '/ˈfæm.əl.i/', themeId: 'family', imageUrl: '/images/family/family.png', example: 'Family is important.' },
    { id: 'relative', english: 'relative', chinese: '亲戚', phonetic: '/ˈrel.ə.tɪv/', themeId: 'family', imageUrl: '/images/family/relative.png', example: 'Relatives visit on holidays.' },
    // 身体 (body) - 52
    { id: 'head', english: 'head', chinese: '头', phonetic: '/hed/', themeId: 'body', imageUrl: '/images/body/head.png', example: 'My head is round.' },
    { id: 'face', english: 'face', chinese: '脸', phonetic: '/feɪs/', themeId: 'body', imageUrl: '/images/body/face.png', example: 'I wash my face.' },
    { id: 'eye', english: 'eye', chinese: '眼睛', phonetic: '/aɪ/', themeId: 'body', imageUrl: '/images/body/eye.png', example: 'I see with my eyes.' },
    { id: 'nose', english: 'nose', chinese: '鼻子', phonetic: '/noʊz/', themeId: 'body', imageUrl: '/images/body/nose.png', example: 'I smell with my nose.' },
    { id: 'mouth', english: 'mouth', chinese: '嘴巴', phonetic: '/maʊθ/', themeId: 'body', imageUrl: '/images/body/mouth.png', example: 'I eat with my mouth.' },
    { id: 'ear', english: 'ear', chinese: '耳朵', phonetic: '/ɪr/', themeId: 'body', imageUrl: '/images/body/ear.png', example: 'I hear with my ears.' },
    { id: 'hair', english: 'hair', chinese: '头发', phonetic: '/her/', themeId: 'body', imageUrl: '/images/body/hair.png', example: 'My hair is long.' },
    { id: 'neck', english: 'neck', chinese: '脖子', phonetic: '/nek/', themeId: 'body', imageUrl: '/images/body/neck.png', example: 'A giraffe has a long neck.' },
    { id: 'shoulder', english: 'shoulder', chinese: '肩膀', phonetic: '/ˈʃoʊl.dər/', themeId: 'body', imageUrl: '/images/body/shoulder.png', example: 'I carry a bag on my shoulder.' },
    { id: 'arm', english: 'arm', chinese: '手臂', phonetic: '/ɑːrm/', themeId: 'body', imageUrl: '/images/body/arm.png', example: 'My arms are strong.' },
    { id: 'hand', english: 'hand', chinese: '手', phonetic: '/hænd/', themeId: 'body', imageUrl: '/images/body/hand.png', example: 'I wave my hand.' },
    { id: 'finger', english: 'finger', chinese: '手指', phonetic: '/ˈfɪŋ.ɡər/', themeId: 'body', imageUrl: '/images/body/finger.png', example: 'I have five fingers on my hand.' },
    { id: 'thumb', english: 'thumb', chinese: '拇指', phonetic: '/θʌm/', themeId: 'body', imageUrl: '/images/body/thumb.png', example: 'The thumb is the biggest finger.' },
    { id: 'chest', english: 'chest', chinese: '胸部', phonetic: '/tʃest/', themeId: 'body', imageUrl: '/images/body/chest.png', example: 'My heart is in my chest.' },
    { id: 'back', english: 'back', chinese: '背部', phonetic: '/bæk/', themeId: 'body', imageUrl: '/images/body/back.png', example: 'I sleep on my back.' },
    { id: 'stomach', english: 'stomach', chinese: '肚子', phonetic: '/ˈstʌm.ək/', themeId: 'body', imageUrl: '/images/body/stomach.png', example: 'Food goes to the stomach.' },
    { id: 'leg', english: 'leg', chinese: '腿', phonetic: '/leɡ/', themeId: 'body', imageUrl: '/images/body/leg.png', example: 'I walk with my legs.' },
    { id: 'knee', english: 'knee', chinese: '膝盖', phonetic: '/niː/', themeId: 'body', imageUrl: '/images/body/knee.png', example: 'My knee bends when I walk.' },
    { id: 'foot', english: 'foot', chinese: '脚', phonetic: '/fʊt/', themeId: 'body', imageUrl: '/images/body/foot.png', example: 'I stand on my feet.' },
    { id: 'toe', english: 'toe', chinese: '脚趾', phonetic: '/toʊ/', themeId: 'body', imageUrl: '/images/body/toe.png', example: 'I have ten toes on my feet.' },
    { id: 'elbow', english: 'elbow', chinese: '肘部', phonetic: '/ˈel.boʊ/', themeId: 'body', imageUrl: '/images/body/elbow.png', example: 'My elbow bends my arm.' },
    { id: 'wrist', english: 'wrist', chinese: '手腕', phonetic: '/rɪst/', themeId: 'body', imageUrl: '/images/body/wrist.png', example: 'A watch goes on the wrist.' },
    { id: 'ankle', english: 'ankle', chinese: '脚踝', phonetic: '/ˈæŋ.kəl/', themeId: 'body', imageUrl: '/images/body/ankle.png', example: 'The ankle connects the foot to the leg.' },
    { id: 'heel', english: 'heel', chinese: '脚跟', phonetic: '/hiːl/', themeId: 'body', imageUrl: '/images/body/heel.png', example: 'The heel is the back of the foot.' },
    { id: 'palm', english: 'palm', chinese: '手掌', phonetic: '/pɑːm/', themeId: 'body', imageUrl: '/images/body/palm.png', example: 'The palm is the inside of the hand.' },
    { id: 'forehead', english: 'forehead', chinese: '额头', phonetic: '/ˈfɔːr.hed/', themeId: 'body', imageUrl: '/images/body/forehead.png', example: 'My forehead is above my eyes.' },
    { id: 'cheek', english: 'cheek', chinese: '脸颊', phonetic: '/tʃiːk/', themeId: 'body', imageUrl: '/images/body/cheek.png', example: 'My cheeks turn red when I am shy.' },
    { id: 'chin', english: 'chin', chinese: '下巴', phonetic: '/tʃɪn/', themeId: 'body', imageUrl: '/images/body/chin.png', example: 'My chin is below my mouth.' },
    { id: 'lip', english: 'lip', chinese: '嘴唇', phonetic: '/lɪp/', themeId: 'body', imageUrl: '/images/body/lip.png', example: 'My lips are around my mouth.' },
    { id: 'tooth', english: 'tooth', chinese: '牙齿', phonetic: '/tuːθ/', themeId: 'body', imageUrl: '/images/body/tooth.png', example: 'You should brush your teeth daily.' },
    { id: 'tongue', english: 'tongue', chinese: '舌头', phonetic: '/tʌŋ/', themeId: 'body', imageUrl: '/images/body/tongue.png', example: 'My tongue tastes food.' },
    { id: 'eyebrow', english: 'eyebrow', chinese: '眉毛', phonetic: '/ˈaɪ.braʊ/', themeId: 'body', imageUrl: '/images/body/eyebrow.png', example: 'Eyebrows protect the eyes.' },
    { id: 'eyelash', english: 'eyelash', chinese: '睫毛', phonetic: '/ˈaɪ.læʃ/', themeId: 'body', imageUrl: '/images/body/eyelash.png', example: 'Eyelashes are pretty.' },
    { id: 'beard', english: 'beard', chinese: '胡须', phonetic: '/bɪrd/', themeId: 'body', imageUrl: '/images/body/beard.png', example: 'My dad has a beard.' },
    { id: 'mustache', english: 'mustache', chinese: '胡子', phonetic: '/ˈmʌs.tæʃ/', themeId: 'body', imageUrl: '/images/body/mustache.png', example: 'A mustache is above the lip.' },
    { id: 'waist', english: 'waist', chinese: '腰部', phonetic: '/weɪst/', themeId: 'body', imageUrl: '/images/body/waist.png', example: 'A belt goes around the waist.' },
    { id: 'hip', english: 'hip', chinese: '臀部', phonetic: '/hɪp/', themeId: 'body', imageUrl: '/images/body/hip.png', example: 'Hips help us dance.' },
    { id: 'thigh', english: 'thigh', chinese: '大腿', phonetic: '/θaɪ/', themeId: 'body', imageUrl: '/images/body/thigh.png', example: 'The thigh is the upper leg.' },
    { id: 'calf', english: 'calf', chinese: '小腿', phonetic: '/kæf/', themeId: 'body', imageUrl: '/images/body/calf.png', example: 'The calf is the lower leg.' },
    { id: 'shin', english: 'shin', chinese: '胫骨', phonetic: '/ʃɪn/', themeId: 'body', imageUrl: '/images/body/shin.png', example: 'The shin is the front of the leg.' },
    { id: 'muscle', english: 'muscle', chinese: '肌肉', phonetic: '/ˈmʌs.əl/', themeId: 'body', imageUrl: '/images/body/muscle.png', example: 'Muscles make us strong.' },
    { id: 'bone', english: 'bone', chinese: '骨头', phonetic: '/boʊn/', themeId: 'body', imageUrl: '/images/body/bone.png', example: 'Bones support our body.' },
    { id: 'skin', english: 'skin', chinese: '皮肤', phonetic: '/skɪn/', themeId: 'body', imageUrl: '/images/body/skin.png', example: 'Skin covers our body.' },
    { id: 'blood', english: 'blood', chinese: '血液', phonetic: '/blʌd/', themeId: 'body', imageUrl: '/images/body/blood.png', example: 'Blood flows in our veins.' },
    { id: 'heart', english: 'heart', chinese: '心脏', phonetic: '/hɑːrt/', themeId: 'body', imageUrl: '/images/body/heart.png', example: 'My heart pumps blood.' },
    { id: 'brain', english: 'brain', chinese: '大脑', phonetic: '/breɪn/', themeId: 'body', imageUrl: '/images/body/brain.png', example: 'My brain helps me think.' },
    { id: 'lung', english: 'lung', chinese: '肺', phonetic: '/lʌŋ/', themeId: 'body', imageUrl: '/images/body/lung.png', example: 'Lungs help us breathe.' },
    { id: 'liver', english: 'liver', chinese: '肝脏', phonetic: '/ˈlɪv.ər/', themeId: 'body', imageUrl: '/images/body/liver.png', example: 'The liver cleans our blood.' },
    { id: 'kidney', english: 'kidney', chinese: '肾脏', phonetic: '/ˈkɪd.ni/', themeId: 'body', imageUrl: '/images/body/kidney.png', example: 'Kidneys filter waste.' },
    { id: 'spine', english: 'spine', chinese: '脊柱', phonetic: '/spaɪn/', themeId: 'body', imageUrl: '/images/body/spine.png', example: 'The spine supports the back.' },
    { id: 'rib', english: 'rib', chinese: '肋骨', phonetic: '/rɪb/', themeId: 'body', imageUrl: '/images/body/rib.png', example: 'Ribs protect our organs.' },
    // 食物 (food) - 34
    { id: 'bread', english: 'bread', chinese: '面包', phonetic: '/bred/', themeId: 'food', imageUrl: '/images/food/bread.png', example: 'I eat bread for breakfast.' },
    { id: 'rice', english: 'rice', chinese: '米饭', phonetic: '/raɪs/', themeId: 'food', imageUrl: '/images/food/rice.png', example: 'Rice is white and fluffy.' },
    { id: 'noodle', english: 'noodle', chinese: '面条', phonetic: '/ˈnuː.dəl/', themeId: 'food', imageUrl: '/images/food/noodle.png', example: 'Noodles are long and thin.' },
    { id: 'pizza', english: 'pizza', chinese: '披萨', phonetic: '/ˈpiːt.sə/', themeId: 'food', imageUrl: '/images/food/pizza.png', example: 'Pizza has cheese and tomato.' },
    { id: 'hamburger', english: 'hamburger', chinese: '汉堡包', phonetic: '/ˈhæm.bɜːr.ɡər/', themeId: 'food', imageUrl: '/images/food/hamburger.png', example: 'A hamburger is delicious.' },
    { id: 'sandwich', english: 'sandwich', chinese: '三明治', phonetic: '/ˈsænd.wɪtʃ/', themeId: 'food', imageUrl: '/images/food/sandwich.png', example: 'A sandwich has meat and vegetables.' },
    { id: 'salad', english: 'salad', chinese: '沙拉', phonetic: '/ˈsæl.əd/', themeId: 'food', imageUrl: '/images/food/salad.png', example: 'Salad is healthy and fresh.' },
    { id: 'soup', english: 'soup', chinese: '汤', phonetic: '/suːp/', themeId: 'food', imageUrl: '/images/food/soup.png', example: 'Soup is warm and tasty.' },
    { id: 'egg', english: 'egg', chinese: '鸡蛋', phonetic: '/eɡ/', themeId: 'food', imageUrl: '/images/food/egg.png', example: 'I like to eat eggs.' },
    { id: 'cheese', english: 'cheese', chinese: '奶酪', phonetic: '/tʃiːz/', themeId: 'food', imageUrl: '/images/food/cheese.png', example: 'Mice like to eat cheese.' },
    { id: 'meat', english: 'meat', chinese: '肉', phonetic: '/miːt/', themeId: 'food', imageUrl: '/images/food/meat.png', example: 'Lions eat meat.' },
    { id: 'chicken', english: 'chicken', chinese: '鸡肉', phonetic: '/ˈtʃɪk.ɪn/', themeId: 'food', imageUrl: '/images/food/chicken.png', example: 'I like fried chicken.' },
    { id: 'beef', english: 'beef', chinese: '牛肉', phonetic: '/biːf/', themeId: 'food', imageUrl: '/images/food/beef.png', example: 'Beef comes from cows.' },
    { id: 'pork', english: 'pork', chinese: '猪肉', phonetic: '/pɔːrk/', themeId: 'food', imageUrl: '/images/food/pork.png', example: 'Pork comes from pigs.' },
    { id: 'fish', english: 'fish', chinese: '鱼肉', phonetic: '/fɪʃ/', themeId: 'food', imageUrl: '/images/food/fish.png', example: 'Fish is good for you.' },
    { id: 'vegetable', english: 'vegetable', chinese: '蔬菜', phonetic: '/ˈvedʒ.tə.bəl/', themeId: 'food', imageUrl: '/images/food/vegetable.png', example: 'Eat your vegetables.' },
    { id: 'fruit', english: 'fruit', chinese: '水果', phonetic: '/fruːt/', themeId: 'food', imageUrl: '/images/food/fruit.png', example: 'Fruit is sweet.' },
    { id: 'cake', english: 'cake', chinese: '蛋糕', phonetic: '/keɪk/', themeId: 'food', imageUrl: '/images/food/cake.png', example: 'I want a birthday cake.' },
    { id: 'cookie', english: 'cookie', chinese: '饼干', phonetic: '/ˈkʊk.i/', themeId: 'food', imageUrl: '/images/food/cookie.png', example: 'I love chocolate cookies.' },
    { id: 'ice cream', english: 'ice cream', chinese: '冰淇淋', phonetic: '/aɪs kriːm/', themeId: 'food', imageUrl: '/images/food/ice-cream.png', example: 'Ice cream is cold.' },
    { id: 'chocolate', english: 'chocolate', chinese: '巧克力', phonetic: '/ˈtʃɔːk.lət/', themeId: 'food', imageUrl: '/images/food/chocolate.png', example: 'Chocolate is sweet.' },
    { id: 'candy', english: 'candy', chinese: '糖果', phonetic: '/ˈkæn.di/', themeId: 'food', imageUrl: '/images/food/candy.png', example: 'Too much candy is bad.' },
    { id: 'juice', english: 'juice', chinese: '果汁', phonetic: '/dʒuːs/', themeId: 'food', imageUrl: '/images/food/juice.png', example: 'I drink orange juice.' },
    { id: 'water', english: 'water', chinese: '水', phonetic: '/ˈwɔː.tər/', themeId: 'food', imageUrl: '/images/food/water.png', example: 'Drink a lot of water.' },
    { id: 'milk', english: 'milk', chinese: '牛奶', phonetic: '/mɪlk/', themeId: 'food', imageUrl: '/images/food/milk.png', example: 'Milk makes bones strong.' },
    { id: 'donut', english: 'donut', chinese: '甜甜圈', phonetic: '/ˈdoʊ.nʌt/', themeId: 'food', imageUrl: '/images/food/donut.png', example: 'Donuts are round and sweet.' },
    { id: 'pretzel', english: 'pretzel', chinese: '椒盐脆饼', phonetic: '/ˈpret.səl/', themeId: 'food', imageUrl: '/images/food/pretzel.png', example: 'Pretzels are twisted and salty.' },
    { id: 'popcorn', english: 'popcorn', chinese: '爆米花', phonetic: '/ˈpɑːp.kɔːrn/', themeId: 'food', imageUrl: '/images/food/popcorn.png', example: 'Popcorn pops when heated.' },
    { id: 'chips', english: 'chips', chinese: '薯片', phonetic: '/tʃɪps/', themeId: 'food', imageUrl: '/images/food/chips.png', example: 'Chips are crispy and salty.' },
    { id: 'french fries', english: 'french fries', chinese: '薯条', phonetic: '/frentʃ fraɪz/', themeId: 'food', imageUrl: '/images/food/french-fries.png', example: 'French fries are golden.' },
    { id: 'nuts', english: 'nuts', chinese: '坚果', phonetic: '/nʌts/', themeId: 'food', imageUrl: '/images/food/nuts.png', example: 'Nuts are healthy snacks.' },
    { id: 'seeds', english: 'seeds', chinese: '种子', phonetic: '/siːdz/', themeId: 'food', imageUrl: '/images/food/seeds.png', example: 'Seeds grow into plants.' },
    { id: 'beans', english: 'beans', chinese: '豆子', phonetic: '/biːnz/', themeId: 'food', imageUrl: '/images/food/beans.png', example: 'Beans are full of protein.' },
    // 玩具 (toys) - 47
    { id: 'ball', english: 'ball', chinese: '球', phonetic: '/bɔːl/', themeId: 'toys', imageUrl: '/images/toys/ball.png', example: 'I play with a ball.' },
    { id: 'doll', english: 'doll', chinese: '娃娃', phonetic: '/dɑːl/', themeId: 'toys', imageUrl: '/images/toys/doll.png', example: 'The doll has pretty hair.' },
    { id: 'teddy bear', english: 'teddy bear', chinese: '泰迪熊', phonetic: '/ˈted.i ber/', themeId: 'toys', imageUrl: '/images/toys/teddy-bear.png', example: 'My teddy bear is soft and cuddly.' },
    { id: 'car', english: 'car', chinese: '玩具车', phonetic: '/kɑːr/', themeId: 'toys', imageUrl: '/images/toys/car.png', example: 'The toy car is red.' },
    { id: 'train', english: 'train', chinese: '火车', phonetic: '/treɪn/', themeId: 'toys', imageUrl: '/images/toys/train.png', example: 'The train goes choo-choo.' },
    { id: 'airplane', english: 'airplane', chinese: '飞机', phonetic: '/ˈer.pleɪn/', themeId: 'toys', imageUrl: '/images/toys/airplane.png', example: 'The airplane flies in the sky.' },
    { id: 'boat', english: 'boat', chinese: '船', phonetic: '/boʊt/', themeId: 'toys', imageUrl: '/images/toys/boat.png', example: 'The boat floats on water.' },
    { id: 'bicycle', english: 'bicycle', chinese: '自行车', phonetic: '/ˈbaɪ.sɪ.kəl/', themeId: 'toys', imageUrl: '/images/toys/bicycle.png', example: 'I ride my bicycle.' },
    { id: 'scooter', english: 'scooter', chinese: '滑板车', phonetic: '/ˈskuː.tər/', themeId: 'toys', imageUrl: '/images/toys/scooter.png', example: 'A scooter has two wheels.' },
    { id: 'skateboard', english: 'skateboard', chinese: '滑板', phonetic: '/ˈskeɪt.bɔːrd/', themeId: 'toys', imageUrl: '/images/toys/skateboard.png', example: 'Skateboarding is fun.' },
    { id: 'blocks', english: 'blocks', chinese: '积木', phonetic: '/blɑːks/', themeId: 'toys', imageUrl: '/images/toys/blocks.png', example: 'I build towers with blocks.' },
    { id: 'puzzle', english: 'puzzle', chinese: '拼图', phonetic: '/ˈpʌz.əl/', themeId: 'toys', imageUrl: '/images/toys/puzzle.png', example: 'This puzzle has many pieces.' },
    { id: 'kite', english: 'kite', chinese: '风筝', phonetic: '/kaɪt/', themeId: 'toys', imageUrl: '/images/toys/kite.png', example: 'The kite flies high in the wind.' },
    { id: 'yo-yo', english: 'yo-yo', chinese: '悠悠球', phonetic: '/ˈjoʊ.joʊ/', themeId: 'toys', imageUrl: '/images/toys/yo-yo.png', example: 'A yo-yo goes up and down.' },
    { id: 'top', english: 'top', chinese: '陀螺', phonetic: '/tɑːp/', themeId: 'toys', imageUrl: '/images/toys/top.png', example: 'The top spins very fast.' },
    { id: 'marbles', english: 'marbles', chinese: '弹珠', phonetic: '/ˈmɑːr.bəlz/', themeId: 'toys', imageUrl: '/images/toys/marbles.png', example: 'Marbles are small and round.' },
    { id: 'jump rope', english: 'jump rope', chinese: '跳绳', phonetic: '/dʒʌmp roʊp/', themeId: 'toys', imageUrl: '/images/toys/jump-rope.png', example: 'I use a jump rope for exercise.' },
    { id: 'hula hoop', english: 'hula hoop', chinese: '呼啦圈', phonetic: '/ˈhuː.lə huːp/', themeId: 'toys', imageUrl: '/images/toys/hula-hoop.png', example: 'A hula hoop spins around your waist.' },
    { id: 'frisbee', english: 'frisbee', chinese: '飞盘', phonetic: '/ˈfrɪz.bi/', themeId: 'toys', imageUrl: '/images/toys/frisbee.png', example: 'A frisbee flies through the air.' },
    { id: 'boomerang', english: 'boomerang', chinese: '回旋镖', phonetic: '/ˈbuː.mə.ræŋ/', themeId: 'toys', imageUrl: '/images/toys/boomerang.png', example: 'A boomerang comes back to you.' },
    { id: 'slinky', english: 'slinky', chinese: '弹簧玩具', phonetic: '/ˈslɪŋ.ki/', themeId: 'toys', imageUrl: '/images/toys/slinky.png', example: 'A slinky walks down stairs.' },
    { id: 'jack-in-the-box', english: 'jack-in-the-box', chinese: '弹跳盒', phonetic: '/dʒæk ɪn ðə bɑːks/', themeId: 'toys', imageUrl: '/images/toys/jack-in-the-box.png', example: 'Jack pops out of the box.' },
    { id: 'kaleidoscope', english: 'kaleidoscope', chinese: '万花筒', phonetic: '/kəˈlaɪ.də.skoʊp/', themeId: 'toys', imageUrl: '/images/toys/kaleidoscope.png', example: 'A kaleidoscope shows pretty patterns.' },
    { id: 'magic wand', english: 'magic wand', chinese: '魔法棒', phonetic: '/ˈmædʒ.ɪk wɑːnd/', themeId: 'toys', imageUrl: '/images/toys/magic-wand.png', example: 'A magic wand does tricks.' },
    { id: 'puppet', english: 'puppet', chinese: '木偶', phonetic: '/ˈpʌp.ɪt/', themeId: 'toys', imageUrl: '/images/toys/puppet.png', example: 'A puppet dances on strings.' },
    { id: 'robot', english: 'robot', chinese: '机器人', phonetic: '/ˈroʊ.bɑːt/', themeId: 'toys', imageUrl: '/images/toys/robot.png', example: 'The robot moves and talks.' },
    { id: 'action figure', english: 'action figure', chinese: '动作人偶', phonetic: '/ˈæk.ʃən ˈfɪɡ.jər/', themeId: 'toys', imageUrl: '/images/toys/action-figure.png', example: 'This action figure is a superhero.' },
    { id: 'toy soldier', english: 'toy soldier', chinese: '玩具士兵', phonetic: '/tɔɪ ˈsoʊl.dʒər/', themeId: 'toys', imageUrl: '/images/toys/toy-soldier.png', example: 'The toy soldier stands guard.' },
    { id: 'rocking horse', english: 'rocking horse', chinese: '摇摆木马', phonetic: '/ˈrɑː.kɪŋ hɔːrs/', themeId: 'toys', imageUrl: '/images/toys/rocking-horse.png', example: 'The rocking horse rocks back and forth.' },
    { id: 'swing', english: 'swing', chinese: '秋千', phonetic: '/swɪŋ/', themeId: 'toys', imageUrl: '/images/toys/swing.png', example: 'The swing goes high and low.' },
    { id: 'slide', english: 'slide', chinese: '滑梯', phonetic: '/slaɪd/', themeId: 'toys', imageUrl: '/images/toys/slide.png', example: 'I slide down the slide.' },
    { id: 'seesaw', english: 'seesaw', chinese: '跷跷板', phonetic: '/ˈsiː.sɔː/', themeId: 'toys', imageUrl: '/images/toys/seesaw.png', example: 'The seesaw goes up and down.' },
    { id: 'sandbox', english: 'sandbox', chinese: '沙盒', phonetic: '/ˈsænd.bɑːks/', themeId: 'toys', imageUrl: '/images/toys/sandbox.png', example: 'I play in the sandbox.' },
    { id: 'bucket', english: 'bucket', chinese: '桶', phonetic: '/ˈbʌk.ɪt/', themeId: 'toys', imageUrl: '/images/toys/bucket.png', example: 'A bucket holds sand and water.' },
    { id: 'shovel', english: 'shovel', chinese: '铲子', phonetic: '/ˈʃʌv.əl/', themeId: 'toys', imageUrl: '/images/toys/shovel.png', example: 'A shovel digs in the sand.' },
    { id: 'whistle', english: 'whistle', chinese: '哨子', phonetic: '/ˈwɪs.əl/', themeId: 'toys', imageUrl: '/images/toys/whistle.png', example: 'A whistle makes a loud sound.' },
    { id: 'harmonica', english: 'harmonica', chinese: '口琴', phonetic: '/hɑːrˈmɑː.nɪ.kə/', themeId: 'toys', imageUrl: '/images/toys/harmonica.png', example: 'A harmonica plays music.' },
    { id: 'drum', english: 'drum', chinese: '鼓', phonetic: '/drʌm/', themeId: 'toys', imageUrl: '/images/toys/drum.png', example: 'A drum makes a boom sound.' },
    { id: 'xylophone', english: 'xylophone', chinese: '木琴', phonetic: '/ˈzaɪ.lə.foʊn/', themeId: 'toys', imageUrl: '/images/toys/xylophone.png', example: 'A xylophone has colorful keys.' },
    { id: 'tambourine', english: 'tambourine', chinese: '铃鼓', phonetic: '/ˌtæm.bəˈriːn/', themeId: 'toys', imageUrl: '/images/toys/tambourine.png', example: 'A tambourine jingles when shaken.' },
    { id: 'maracas', english: 'maracas', chinese: '沙锤', phonetic: '/məˈrɑː.kəz/', themeId: 'toys', imageUrl: '/images/toys/maracas.png', example: 'Maracas shake and rattle.' },
    { id: 'coloring book', english: 'coloring book', chinese: '涂色书', phonetic: '/ˈkʌl.ər.ɪŋ bʊk/', themeId: 'toys', imageUrl: '/images/toys/coloring-book.png', example: 'A coloring book has pictures to color.' },
    { id: 'crayons', english: 'crayons', chinese: '蜡笔', phonetic: '/ˈkreɪ.ɑːnz/', themeId: 'toys', imageUrl: '/images/toys/crayons.png', example: 'Crayons come in many colors.' },
    { id: 'markers', english: 'markers', chinese: '马克笔', phonetic: '/ˈmɑːr.kərz/', themeId: 'toys', imageUrl: '/images/toys/markers.png', example: 'Markers draw bright lines.' },
    { id: 'paint', english: 'paint', chinese: '颜料', phonetic: '/peɪnt/', themeId: 'toys', imageUrl: '/images/toys/paint.png', example: 'Paint makes colorful pictures.' },
    { id: 'paintbrush', english: 'paintbrush', chinese: '画笔', phonetic: '/ˈpeɪnt.brʌʃ/', themeId: 'toys', imageUrl: '/images/toys/paintbrush.png', example: 'A paintbrush spreads paint.' },
    { id: 'easel', english: 'easel', chinese: '画架', phonetic: '/ˈiː.zəl/', themeId: 'toys', imageUrl: '/images/toys/easel.png', example: 'An easel holds paper for painting.' }
];

const themeMap = {
    fruits: '水果 (Fruits)',
    animals: '动物 (Animals)',
    colors: '颜色 (Colors)',
    numbers: '数字 (Numbers)',
    family: '家庭 (Family)',
    body: '身体 (Body)',
    food: '食物 (Food)',
    toys: '玩具 (Toys)'
};

const data = {};
for (const theme in themeMap) {
    data[themeMap[theme]] = [];
}

vocabulary.forEach(word => {
    if (word && word.themeId && themeMap[word.themeId]) {
        data[themeMap[word.themeId]].push({
            en: word.english,
            cn: word.chinese,
            phonetic: word.phonetic || '',
            example: word.example || '',
            imageUrl: word.imageUrl || ''
        });
    }
});

// --- App State ---
const appState = {
    currentCategory: Object.keys(data)[0],
    currentMode: 'flashcards',
    currentQuestion: null,
    isGameLoading: false
};

// --- DOM Elements ---
const categoryNav = document.getElementById('category-nav');
const flashcardContainer = document.getElementById('flashcard-container');
const gameContainer = document.getElementById('game-container');
const modeFlashcardsBtn = document.getElementById('mode-flashcards');
const modeGameBtn = document.getElementById('mode-game');
const appSubtitle = document.getElementById('app-subtitle');
const gameQuestionWordEl = document.getElementById('game-question-word');
const gameChoicesGridEl = document.getElementById('game-choices-grid');
const menuToggle = document.getElementById('menu-toggle');
const menuBackdrop = document.getElementById('menu-backdrop');


// --- Core Functions ---

function speak(text, rate = 0.9, pitch = 1.2) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = rate;
        utterance.pitch = pitch;
        window.speechSynthesis.speak(utterance);
    } else {
        console.error('Browser does not support Speech Synthesis.');
    }
}


// --- UI Rendering & Progressive Loading ---

function displayFlashcardsProgressively(category) {
    const words = data[category];
    flashcardContainer.innerHTML = '';

    words.forEach(item => {
        const card = document.createElement('div');
        const cardId = `card-${category.replace(/[^a-zA-Z0-9]/g, '')}-${item.en.replace(/[^a-zA-Z0-9]/g, '')}`;
        card.id = cardId;
        card.className = 'flashcard flex flex-col items-center justify-start rounded-2xl shadow-lg p-3 bg-white text-center';

        const imageContent = `<img src="${item.imageUrl}" alt="${item.en}" class="w-full h-full object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                              <div class="flex items-center justify-center w-full h-full text-6xl bg-gray-100 rounded-lg" style="display:none;">📷</div>`;

        card.innerHTML = `
            <div class="image-container">${imageContent}</div>
            <div class="flex flex-col flex-grow justify-between">
                <div>
                    <p class="text-lg font-bold text-gray-800">${item.en}</p>
                    <p class="text-sm text-gray-500">${item.phonetic}</p>
                    <p class="text-md font-semibold text-sky-600 mt-1">${item.cn}</p>
                </div>
                <p class="text-xs text-gray-400 mt-2 italic text-center w-full">"${item.example}"</p>
            </div>
        `;

        card.addEventListener('click', () => speak(item.en));
        flashcardContainer.appendChild(card);
    });

}

function renderGameChoices(choices) {
    gameChoicesGridEl.innerHTML = '';
    choices.forEach(item => {
        const card = document.createElement('div');
        card.className = 'game-choice-card aspect-square rounded-2xl shadow-lg p-2 flex items-center justify-center';

        const imageContent = `<img src="${item.imageUrl}" alt="${item.en}" class="w-full h-full object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                              <div class="flex items-center justify-center w-full h-full text-6xl bg-gray-100 rounded-lg" style="display:none;">📷</div>`;
        card.innerHTML = imageContent;

        card.addEventListener('click', () => handleChoiceClick(item, card));
        gameChoicesGridEl.appendChild(card);
    });
}

// --- Game Logic ---

function generateQuestion() {
    const words = [...data[appState.currentCategory]];
    if (words.length < 4) {
        gameChoicesGridEl.innerHTML = '<p class="text-center col-span-full text-gray-500 p-8">这个类别单词太少，无法开始游戏哦！</p>';
        gameQuestionWordEl.textContent = '';
        return;
    }

    for (let i = words.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [words[i], words[j]] = [words[j], words[i]]; }
    const choices = words.slice(0, 4);
    appState.currentQuestion = choices[Math.floor(Math.random() * 4)];

    gameQuestionWordEl.textContent = appState.currentQuestion.en;
    speak(appState.currentQuestion.en, 0.8, 1);

    renderGameChoices(choices);
}

function handleChoiceClick(selectedItem, cardElement) {
    if (appState.isGameLoading) return;
    const isCorrect = selectedItem.en === appState.currentQuestion.en;
    gameChoicesGridEl.style.pointerEvents = 'none';
    cardElement.classList.add(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
        speak('Great!', 1.2, 1.3);
        setTimeout(() => {
            generateQuestion();
            gameChoicesGridEl.style.pointerEvents = 'auto';
        }, 1200);
    } else {
        speak('Try again!', 1.2, 1);
        setTimeout(() => {
            cardElement.classList.remove('incorrect');
            gameChoicesGridEl.style.pointerEvents = 'auto';
        }, 1200);
    }
}

// --- Mode & Category & Menu Management ---

function updateActiveUI() {
    modeFlashcardsBtn.classList.toggle('active', appState.currentMode === 'flashcards');
    modeGameBtn.classList.toggle('active', appState.currentMode === 'game');
    document.querySelectorAll('#category-nav .category-button').forEach(button => {
        button.classList.toggle('active-category', button.textContent.trim() === appState.currentCategory);
    });
    appSubtitle.textContent = appState.currentMode === 'flashcards' 
        ? '点击卡片学习单词吧！'
        : '听声音，选择正确的图片！';
}

async function setMode(mode) {
    appState.currentMode = mode;
    flashcardContainer.classList.toggle('hidden', mode !== 'flashcards');
    gameContainer.classList.toggle('hidden', mode !== 'game');
    await selectCategory(appState.currentCategory);
}

async function selectCategory(category) {
    appState.currentCategory = category;
    updateActiveUI();

    if (appState.currentMode === 'flashcards') {
        displayFlashcardsProgressively(category);
    } else {
        generateQuestion();
    }

    if (window.innerWidth < 768) {
        toggleMenu();
    }
}

function toggleMenu() {
    categoryNav.classList.toggle('-translate-x-full');
    menuBackdrop.classList.toggle('hidden');
}

// --- Initialization ---
function init() {

    const categories = Object.keys(data);
    categoryNav.innerHTML = '<h2 class="px-2 text-2xl font-bold text-sky-600 mb-4">主题分类</h2>';
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.className = 'category-button w-full text-left px-4 py-3 text-lg font-semibold text-gray-700 rounded-lg transition-colors';
        button.addEventListener('click', () => selectCategory(category));
        categoryNav.appendChild(button);
    });

    modeFlashcardsBtn.addEventListener('click', () => setMode('flashcards'));
    modeGameBtn.addEventListener('click', () => setMode('game'));
    
    menuToggle.addEventListener('click', toggleMenu);
    menuBackdrop.addEventListener('click', toggleMenu);

    gameQuestionWordEl.addEventListener('click', () => { 
        if(appState.currentQuestion) speak(appState.currentQuestion.en, 0.8, 1); 
    });
    
    setMode('flashcards');
}

window.onload = init;


