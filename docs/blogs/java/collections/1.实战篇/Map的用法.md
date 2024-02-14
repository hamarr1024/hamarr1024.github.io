---
title: Map的用法
date: 2024-02-12
---

## 1. Map是什么

还是熟悉的配方，熟悉的味道，从官方文档中找答案。

> An object that maps keys to values. A map cannot contain duplicate keys; each key can map to at most one value.
> This interface takes the place of the Dictionary class, which was a totally abstract class rather than an interface.

Map是一个从Keys映射到Values的对象。一个Map的key不能重复，每一个key最多映射一个value。这个接口取代了Dictionary（这个过时了不要用!)。

> The Map interface provides three collection views, which allow a map's contents to be viewed as a set of keys, collection of values, or set of key-value mappings. The order of a map is defined as the order in which the iterators on the map's collection views return their elements. Some map implementations, like the TreeMap class, make specific guarantees as to their order; others, like the HashMap class, do not.

Map接口提供了3个集合视图，keys组成的Set(不可重复), values组成的Collection(可重复)，key-value键值对组成的set(不可重复)。有些Map的实现保证这些视图元素的顺序，比如TreeMap, 有些则不会，比如HashMap

> Note: great care must be exercised if mutable objects are used as map keys. The behavior of a map is not specified if the value of an object is changed in a manner that affects equals comparisons while the object is a key in the map. A special case of this prohibition is that it is not permissible for a map to contain itself as a key. While it is permissible for a map to contain itself as a value, extreme caution is advised: the equals and hashCode methods are no longer well defined on such a map.

要特别小心使用可变对象作为Map的key。当Key对象的值发生改变后，它的equals方法可能会发生改变，这导致了key的等价性被破坏了，可能会产生意想不到的情况，比如值被新增的元素覆盖，或者数据丢失，Map对于这种变化该采取什么样的行为是没有规定的（说白了就是Map接口没有明确实现类如何处理这种情况，完全依赖于实现类的实现，比如HashMap是不会因为这种情况对内部结构做出调整的，但是TreeMap会重新排序）。另外有个特例，就是Map对象不能用它自己作为Key，但是可以作为Value。这也是为什么我们尽量要使用不可变对象作为Key的原因。

> All general-purpose map implementation classes should provide two "standard" constructors: a void (no arguments) constructor which creates an empty map, and a constructor with a single argument of type Map, which creates a new map with the same key-value mappings as its argument. In effect, the latter constructor allows the user to copy any map, producing an equivalent map of the desired class. There is no way to enforce this recommendation (as interfaces cannot contain constructors) but all of the general-purpose map implementations in the JDK comply.

一个通用的Map实现类应该提供2个"标准的"构造函数，一个是空参构造，一个是包含一个Map类型参数的构造，这个构造函数会返回一个新的Map对象，并包含传入的Map对象的所有键值对元素。这使得用户可以拷贝Map。虽然没有办法强制所有的Map实现都遵循这个标准，但是JDK中的通用实现都是遵循的。

> The "destructive" methods contained in this interface, that is, the methods that modify the map on which they operate, are specified to throw UnsupportedOperationException if this map does not support the operation. If this is the case, these methods may, but are not required to, throw an UnsupportedOperationException if the invocation would have no effect on the map. For example, invoking the putAll(Map) method on an unmodifiable map may, but is not required to, throw the exception if the map whose mappings are to be "superimposed" is empty.

对于“破坏性的”API，说白了就是修改类的方法，如果一个实现类不支持，那可以抛出UnsupportedOperationException, 但是如果这个操作不会修改实现类对象的内部数据，也可以不抛出。

> Some map implementations have restrictions on the keys and values they may contain. For example, some implementations prohibit null keys and values, and some have restrictions on the types of their keys. Attempting to insert an ineligible key or value throws an unchecked exception, typically NullPointerException or ClassCastException. Attempting to query the presence of an ineligible key or value may throw an exception, or it may simply return false; some implementations will exhibit the former behavior and some will exhibit the latter. More generally, attempting an operation on an ineligible key or value whose completion would not result in the insertion of an ineligible element into the map may throw an exception or it may succeed, at the option of the implementation. Such exceptions are marked as "optional" in the specification for this interface.

这段话描述了 “opitional”可选方法的含义，实现类并不一定要实现。里面举了个例子，有些Map实现规定了不能使用null作为key或者value，有的没有规定，这个有实现类自己决定。

> Many methods in Collections Framework interfaces are defined in terms of the equals method. For example, the specification for the containsKey(Object key) method says: "returns true if and only if this map contains a mapping for a key k such that (key==null ? k==null : key.equals(k))." This specification should not be construed to imply that invoking Map.containsKey with a non-null argument key will cause key.equals(k) to be invoked for any key k. Implementations are free to implement optimizations whereby the equals invocation is avoided, for example, by first comparing the hash codes of the two keys. (The Object.hashCode() specification guarantees that two objects with unequal hash codes cannot be equal.) More generally, implementations of the various Collections Framework interfaces are free to take advantage of the specified behavior of underlying Object methods wherever the implementor deems it appropriate.

这里描述了equals()和hashCode()的必要充分关系，实现类可以充分利用这个性质。

> Some map operations which perform recursive traversal of the map may fail with an exception for self-referential instances where the map directly or indirectly contains itself. This includes the clone(), equals(), hashCode() and toString() methods. Implementations may optionally handle the self-referential scenario, however most current implementations do not do so.

使用clone(), equals(), hashCode()等方法时要特别小心，可能会引起无限递归。对于可能引起的问题，实现类需要自行处理。



## 2. Map的API

这里还是按照文档的分类。

### 2.1 查询类操作

```java
int size();
boolean isEmpty();
boolean containsKey(Object key);
boolean containsValue(Object value);
V get(Object key);
```

### 2.2 修改类操作

我们一般很少用返回值，因为返回值是旧值，没用了。但是这里还是可以结合文档加深下印象，用的好可以简化操作，代码更简洁优雅.

比如put方法，如果put之前map中不存在这个key, 那么返回null, 如果存在，则返回替换前的旧值

```java
V put(K key, V value);
V remove(Object key);
```

### 2.3 批量操作

```java
void putAll(Map<? extends K, ? extends V> m);
void clear();
```

### 2.4 视图操作:star:

这个其实是用的最多的。

```java
Set<K> keySet();
Collection<V> values();
Set<Map.Entry<K, V>> entrySet();
```

### 2.5 一些常用的默认操作:star:

这些操作在Map接口中都有默认实现，但是实现类一般都根据自身的特点做了优化。但是整体的逻辑和判断流程是一样的。

因此我们可以通过学习默认实现的逻辑来从整体上把握具体实现类的实现逻辑，当然在使用前需要搞清楚具体实现类的逻辑，防止用错产生不符合预期的结果。

#### 2.5.1 getOrDefault

这是对get(K key)方法的增强，

1. 获取旧值
2. 分情况讨论
   1. 如果旧值为空，返回默认值
   2. 如果旧值不为空，但key与原key不相等，返回默认值
   3. 如果旧值不为空，且key与原key相等，则返回新值

> 注意!!!: 这个方法不会修改Map内部的数据和结构

```java
 default V getOrDefault(Object key, V defaultValue) {
        V v;
        return (((v = get(key)) != null) || containsKey(key))
            ? v
            : defaultValue;
    }
```

#### 2.5.2 compute

1. 获取旧值
2. 根据映射函数计算出新值
3. 分情况讨论
   1. 如果新值为空，旧值不为空，执行删除操作
   2. 如果新值为空，旧值也为空，什么都不做
   3. 如果新值不为空，就用新值替换旧值

```java
 default V compute(K key,
            BiFunction<? super K, ? super V, ? extends V> remappingFunction) {
        Objects.requireNonNull(remappingFunction);
        V oldValue = get(key);

        V newValue = remappingFunction.apply(key, oldValue);
        if (newValue == null) {
            // delete mapping
            if (oldValue != null || containsKey(key)) {
                // something to remove
                remove(key);
                return null;
            } else {
                // nothing to do. Leave things as they were.
                return null;
            }
        } else {
            // add or replace old mapping
            put(key, newValue);
            return newValue;
        }
    }
```

#### 2.5.3 computIfAbsent

1. 获取旧值
2. 计算新值
3. 分情况讨论
   1. 如果旧值为空，且新值不为空，则用新值覆盖旧值，返回新值
   2. 如果旧值为空，新值也为空，什么都不做，返回旧值
   3. 如果旧值不为空，新值为空，什么都不做，返回旧值
   4. 如果旧值不为空，新值也不为空，什么都不做，返回旧值

通过上面的讨论可以发现，`当且仅当`旧值为空且新值不为空才会覆盖，并返回新值，其它情况什么都不做，返回旧值。

```java
default V computeIfAbsent(K key,
            Function<? super K, ? extends V> mappingFunction) {
        Objects.requireNonNull(mappingFunction);
        V v;
        if ((v = get(key)) == null) {
            V newValue;
            if ((newValue = mappingFunction.apply(key)) != null) {
                put(key, newValue);
                return newValue;
            }
        }

        return v;
    }
```

在某些场景，比如统计访问次数，key是接口名称，value是访问次数，那么就可以使用这个方法来简化代码

```java
public class VisitCounter {
  private final Map<String, AtomicInteger> counter = new ConcurrentHashMap<>();
  
  public void count(String apiName) {
    	AtomicInteger visitCount = counter.computIfAbsent(apiName, () -> new AtomicInteger());
    	visitCount.getAndIncrement();
  }
}
```

其它操作我在工作中暂时没有用到过，等用到了再补充

## 3. Map.Entry接口

Map.Entry接口是Map中的内部接口，用来定义一个键值对的行为

```java
interface Entry<K,V> {
    // 获取Key
    K getKey();
		// 获取值
    V getValue();

  	// 替换旧值
    V setValue(V value);
		// 两个entry节点相等的条件: key相等&&value相等
    boolean equals(Object o);

  	// key的hashCode ^ value的hashCode
    int hashCode();
		// 静态工具方法，返回基于key的比较器
    public static <K extends Comparable<? super K>, V> Comparator<Map.Entry<K,V>> comparingByKey() {
        return (Comparator<Map.Entry<K, V>> & Serializable)
            (c1, c2) -> c1.getKey().compareTo(c2.getKey());
    }

   	// 静态工具方法，返回基于value的比较器
    public static <K, V extends Comparable<? super V>> Comparator<Map.Entry<K,V>> comparingByValue() {
        return (Comparator<Map.Entry<K, V>> & Serializable)
            (c1, c2) -> c1.getValue().compareTo(c2.getValue());
    }

  	// 静态工具方法，传入基于Key的比较器，返回Entry类型的比较器
    public static <K, V> Comparator<Map.Entry<K, V>> comparingByKey(Comparator<? super K> cmp) {
        Objects.requireNonNull(cmp);
        return (Comparator<Map.Entry<K, V>> & Serializable)
            (c1, c2) -> cmp.compare(c1.getKey(), c2.getKey());
    }

    // 静态工具方法，传入基于Value的比较器，返回Entry类型的比较器
    public static <K, V> Comparator<Map.Entry<K, V>> comparingByValue(Comparator<? super V> cmp) {
        Objects.requireNonNull(cmp);
        return (Comparator<Map.Entry<K, V>> & Serializable)
            (c1, c2) -> cmp.compare(c1.getValue(), c2.getValue());
    }
}
```

## 4. 总结

1. 通过阅读JDK官方文档，从整体上了解的Map的含义，说白了就是键值对映射
2. 回顾了常用的接口

* 查询类操作
* 修改类操作
* 批量操作
* 视图操作：这个是用的最多的, keySet(), values(), entrySet()
* 常用的其它方法: getOrDefault(), compute(), computIfAbsent

3. 最后回顾了一下Map的内部接口Map.Entry, 加深对Entry的理解
