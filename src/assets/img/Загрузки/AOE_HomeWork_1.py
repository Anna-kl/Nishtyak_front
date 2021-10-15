# Задача 1

# for - цикл для перебора элементов в списке или строке

text = 'Hello'
# вывести на экран строку по элементно
for i in text:
    print(i)

# Пусть есть список
a=[3,5,2,9,0]
# получите сумму всех элементов в виде строки (str(i))
# Затем получите из строки, обратно одно целое число
summa_spiska = 0
for element_spiska in a:
    summa_spiska +=element_spiska
summa_spiska_str = str(summa_spiska)
print("Сумма списка прописью", summa_spiska_str)
summa_spiska_int = int(summa_spiska_str)
print("Сумма списка целое число", summa_spiska_int)


# Задача 2. Пусть задач список
a=[3,5,2,9,0]
# Создайте новый список, где элементами будут квадраты чисел исходного списка
a2 =[]
for i in a:
    a2.append(i**2)
print(a)
print(a2)
