# automatically generated by the FlatBuffers compiler, do not modify

# namespace: NetEncoding

import flatbuffers

class Float64Array(object):
    __slots__ = ['_tab']

    @classmethod
    def GetRootAsFloat64Array(cls, buf, offset):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, offset)
        x = Float64Array()
        x.Init(buf, n + offset)
        return x

    # Float64Array
    def Init(self, buf, pos):
        self._tab = flatbuffers.table.Table(buf, pos)

    # Float64Array
    def Data(self, j):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            a = self._tab.Vector(o)
            return self._tab.Get(flatbuffers.number_types.Float64Flags, a + flatbuffers.number_types.UOffsetTFlags.py_type(j * 8))
        return 0

    # Float64Array
    def DataAsNumpy(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            return self._tab.GetVectorAsNumpy(flatbuffers.number_types.Float64Flags, o)
        return 0

    # Float64Array
    def DataLength(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            return self._tab.VectorLen(o)
        return 0

def Float64ArrayStart(builder): builder.StartObject(1)
def Float64ArrayAddData(builder, data): builder.PrependUOffsetTRelativeSlot(0, flatbuffers.number_types.UOffsetTFlags.py_type(data), 0)
def Float64ArrayStartDataVector(builder, numElems): return builder.StartVector(8, numElems, 8)
def Float64ArrayEnd(builder): return builder.EndObject()
